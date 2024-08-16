'use client'
import React, { useContext, useState } from 'react'
import HandleError from './HandleError';
import HandelSuccess from './HandelSuccess';
import axiosForm from '@/utils/axiosForm';
import { useRouter } from 'next/navigation';
import IsChangeContext from '@/helper/IsChangeContext';
import IsUserContext from '@/helper/IsUserContext';

interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}


function RegisterComponent() {
    const [valueInputs, setValueInouts] = useState<IValueInputs>({ first_name: "", last_name: "", email: "", username: "", password: "", confirm_password: "" })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const router = useRouter()
    const context = useContext(IsChangeContext)
    if (!context) {
        throw new Error('this must be a boolean')
    }
    const { setIsChange } = context

    const UserContext = useContext(IsUserContext)
    if (!UserContext) {
        throw new Error('this must be a boolean')
    }
    const { isUser } = UserContext

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(valueInputs.email)
        if (valueInputs.first_name && valueInputs.last_name && isEmail && valueInputs.username && valueInputs.password && valueInputs.password === valueInputs.confirm_password) {
            try {
                const formData = await axiosForm.post('/register', valueInputs) as { data: { message: string, token: string } }
                setErrorMessage('')
                setSuccessMessage(formData.data.message)
                localStorage.setItem('token', formData.data.token)
                setTimeout(() => {
                    setSuccessMessage('')
                    setIsChange(true)
                    router.push('/')
                }, 3000)
            } catch (error) {
                const message = error as { response: { data: { message: string } } }
                setSuccessMessage('')
                setErrorMessage(message.response.data.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            }
        } else if (valueInputs.password != valueInputs.confirm_password) {
            setSuccessMessage('')
            setErrorMessage('Your password not match')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else if (!isEmail) {
            setSuccessMessage('')
            setErrorMessage('Please enter a valid email')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else {
            setSuccessMessage('')
            setErrorMessage('All inputs are required')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }
    return !isUser && (
        <div className='flex justify-center items-center h-full mt-10'>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 w-[90%] md:w-[70%] xl:w-[60%] gap-2 justify-center items-center rounded-md border p-5 md:p-10'>
                <h2 className='col-span-12 w-[70%] md:w-[40%] text-center m-auto border rounded-md outline-gray-400 p-2'>Register Form</h2>
                <HandleError error_message={errorMessage} />
                <HandelSuccess success_message={successMessage} />
                <input type="text" required placeholder='First Name' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, first_name: e.target.value.trim().toLowerCase() })} />
                <input type="text" required placeholder='Last Name' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, last_name: e.target.value.trim().toLowerCase() })} />
                <input type="text" required placeholder='Username' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, username: e.target.value.trim().toLowerCase() })} />
                <input type="test" required placeholder='Email' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, email: e.target.value.trim().toLowerCase() })} />
                <input type="password" required placeholder='Password' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, password: e.target.value.trim() })} />
                <input type="password" required placeholder='Confirm Password' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, confirm_password: e.target.value.trim() })} />
                <button className='col-span-12 w-[100%] m-auto border rounded-md bg-green-600 text-white p-2' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default RegisterComponent