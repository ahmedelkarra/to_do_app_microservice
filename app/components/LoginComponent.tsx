'use client'
import React, { useContext, useState } from 'react'
import HandleError from './HandleError';
import HandelSuccess from './HandelSuccess';
import axiosForm from '@/utils/axiosForm';
import IsChangeContext from '@/helper/IsChangeContext';
import { useRouter } from 'next/navigation';
import IsUserContext from '@/helper/IsUserContext';

interface IValueInputs {
    email_username: string;
    password: string;
}


function LoginComponent() {
    const [valueInputs, setValueInouts] = useState<IValueInputs>({ email_username: "", password: "" })
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
        if (valueInputs.email_username && valueInputs.password) {
            try {
                const formData = await axiosForm.post('/login', valueInputs) as { data: { message: string, token: string } }
                setErrorMessage('')
                setSuccessMessage(formData.data.message)
                localStorage.setItem('token', formData.data.token)
                setTimeout(() => {
                    setSuccessMessage('')
                    router.push('/')
                    setIsChange(true)
                }, 3000)
            } catch (error) {
                const message = error as { response: { data: { message: string } } }
                setSuccessMessage('')
                setErrorMessage(message.response.data.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            }
        } else {
            setSuccessMessage('')
            setErrorMessage('All inputs are required')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    return !isUser && (
        <div className='flex justify-center items-center h-full my-10'>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 w-[90%] sm:w-[70%] md:w-[50%] gap-2 justify-center items-center rounded-md border p-5 md:p-10'>
                <h2 className='col-span-12 w-[70%] md:w-[40%] text-center m-auto border rounded-md outline-gray-400 p-2'>Login Form</h2>
                <HandleError error_message={errorMessage} />
                <HandelSuccess success_message={successMessage} />
                <input type="text" required placeholder='Email / Username' className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, email_username: e.target.value })} />
                <input type="password" required placeholder='Password' className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, password: e.target.value })} />
                <button className='col-span-12 w-[100%] m-auto border rounded-md bg-green-600 text-white p-2' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default LoginComponent