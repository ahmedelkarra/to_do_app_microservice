'use client'
import IsChangeContext from '@/helper/IsChangeContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import HandleError from './HandleError'
import HandelSuccess from './HandelSuccess'
import axiosToDo from '@/utils/axiosToDo'
import IsUserContext from '@/helper/IsUserContext'


interface IToDoInfo {
    title: string;
    body: string;
    isDone: boolean;
}

function ToDoAddComponent() {
    const [valueInputs, setValueInouts] = useState<IToDoInfo>({ title: "", body: "", isDone: false })
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
        if (valueInputs.title && valueInputs.body) {
            try {
                const token = localStorage.getItem('token')
                const formData = await axiosToDo.post('/todo', valueInputs, { headers: { Authorization: token } }) as { data: { message: string, token: string } }
                setErrorMessage('')
                setSuccessMessage(formData.data.message)
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
        } else {
            setSuccessMessage('')
            setErrorMessage('All inputs are required')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }
    return isUser && (
        <div className='flex justify-center items-center h-full mt-10'>
            <form onSubmit={handleSubmit} className='grid grid-cols-12 w-[90%] md:w-[70%] xl:w-[60%] gap-2 justify-center items-center rounded-md border p-5 md:p-10'>
                <h2 className='col-span-12 w-[70%] md:w-[40%] text-center m-auto border rounded-md outline-gray-400 p-2'>Add Task Form</h2>
                <HandleError error_message={errorMessage} />
                <HandelSuccess success_message={successMessage} />
                <input type="text" required placeholder='Title' className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, title: e.target.value.trim() })} />
                <textarea required placeholder='Body' className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2' onChange={(e) => setValueInouts({ ...valueInputs, body: e.target.value.trim() })} />

                <fieldset className="col-span-12 flex flex-wrap justify-center gap-3">
                    <legend className="sr-only">Color</legend>

                    <div>
                        <label
                            htmlFor="ColorBlack"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                        >
                            <input
                                type="radio"
                                name="ColorOption"
                                value="ColorBlack"
                                id="ColorBlack"
                                className="sr-only"
                                checked={valueInputs?.isDone}
                                onChange={() => setValueInouts({ ...valueInputs, isDone: true })}
                            />

                            <p className="text-sm font-medium">DONE</p>
                        </label>
                    </div>


                    <div>
                        <label
                            htmlFor="ColorGold"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-red-500 has-[:checked]:bg-red-500 has-[:checked]:text-white"
                        >
                            <input type="radio" name="ColorOption" value="ColorGold" id="ColorGold" className="sr-only" checked={!valueInputs?.isDone} onChange={() => setValueInouts({ ...valueInputs, isDone: false })} />

                            <p className="text-sm font-medium">NOT DONE</p>
                        </label>
                    </div>

                </fieldset>


                <button className='col-span-12 w-[100%] m-auto border rounded-md bg-green-600 text-white p-2' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ToDoAddComponent