'use client'
import React, { useContext, useEffect, useState } from 'react'
import HandleError from './HandleError';
import HandelSuccess from './HandelSuccess';
import IsChangeContext from '@/helper/IsChangeContext';
import axiosForm from '@/utils/axiosForm';
import UserInfoContext from '@/helper/UserInfoContext';
import { useRouter } from 'next/navigation';
import axiosToDo from '@/utils/axiosToDo';

interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    new_password: string;
    confirm_new_password: string;
}


function ProfileComponent() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ first_name: "", last_name: "", email: "", username: "", password: "", new_password: "", confirm_new_password: "" })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const router = useRouter()
    const context = useContext(IsChangeContext)
    if (!context) {
        throw new Error('this must be a boolean')
    }
    const { setIsChange } = context
    const UserContext = useContext(UserInfoContext)
    if (!UserContext) {
        throw new Error('this must be a boolean')
    }
    const { userInfo } = UserContext

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(valueInputs.email)
        if (valueInputs.first_name && valueInputs.last_name && isEmail && valueInputs.username && valueInputs.password && valueInputs.new_password === valueInputs.confirm_new_password) {
            try {
                const token = localStorage.getItem('token')
                const formData = await axiosForm.put('/me', valueInputs, { headers: { Authorization: token } }) as { data: { message: string } }
                setErrorMessage('')
                setSuccessMessage(formData.data.message)
                setValueInputs({ ...valueInputs, password: "", new_password: "", confirm_new_password: "" })
                setTimeout(() => {
                    setSuccessMessage('')
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
        } else if (valueInputs.new_password != valueInputs.confirm_new_password) {
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

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token') as string
            const headers = { headers: { Authorization: token }, data: valueInputs }
            const formData = await axiosToDo.delete('/destroy', { headers: { Authorization: token, data: valueInputs } }) as { data: { message: string } }
            try {
                const formData = await axiosForm.delete('/me', headers) as { data: { message: string } }
                setErrorMessage('')
                setSuccessMessage(formData.data.message)
                localStorage.removeItem('token')
                setTimeout(() => {
                    setSuccessMessage('')
                    setIsChange(true)
                    router.push('/')
                }, 3000)
            } catch (error) {
                const message = error as { response: { data: { message: string } } }
                setSuccessMessage('')
                setErrorMessage('express' + message?.response?.data?.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            }
        } catch (error) {
            const message = error as { response: { data: { message: string } } }
            setSuccessMessage('')
            setErrorMessage('django' + message?.response?.data?.message)
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    useEffect(() => {
        setValueInputs({ ...valueInputs, first_name: userInfo?.first_name, last_name: userInfo?.last_name, email: userInfo?.email, username: userInfo?.username })
    }, [userInfo])
    return userInfo?.username && (
        <div className='flex justify-center items-center h-full my-10'>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 w-[90%] md:w-[70%] xl:w-[60%] gap-2 justify-center items-center rounded-md border p-5 md:p-10'>
                <h2 className='col-span-12 w-[70%] md:w-[40%] text-center m-auto border rounded-md outline-gray-400 p-2'>Profile Form</h2>
                <HandleError error_message={errorMessage} />
                <HandelSuccess success_message={successMessage} />
                <input type="text" required placeholder='First Name' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, first_name: e.target.value.trim().toLowerCase() })} value={valueInputs?.first_name} />
                <input type="text" required placeholder='Last Name' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, last_name: e.target.value.trim().toLowerCase() })} value={valueInputs?.last_name} />
                <input type="text" required placeholder='Username' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value.trim().toLowerCase() })} value={valueInputs?.username} />
                <input type="email" required placeholder='Email' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value.trim().toLowerCase() })} value={valueInputs?.email} />
                <input type="password" required placeholder='Password' className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value.trim() })} value={valueInputs?.password} />
                <input type="password" placeholder='New Password' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, new_password: e.target.value.trim() })} value={valueInputs?.new_password} />
                <input type="password" placeholder='Confirm New Password' className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInputs({ ...valueInputs, confirm_new_password: e.target.value.trim() })} value={valueInputs?.confirm_new_password} />
                <button className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md bg-green-600 text-white p-2' type='submit'>Submit</button>
                <button className='col-span-12 xl:col-span-6 w-[100%] m-auto border rounded-md bg-red-600 text-white p-2' type='button' onClick={handleDelete}>Delete Account</button>
            </form>
        </div>
    )
}

export default ProfileComponent