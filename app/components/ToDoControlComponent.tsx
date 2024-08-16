'use client'
import ToDoInfoContext, { IToDoInfoContext } from '@/helper/ToDoInfoContext'
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'


interface IToDoInfo {
    title: string;
    body: string;
    isDone: boolean;
}


function ToDoControlComponent() {
    const [valueInputs, setValueInputs] = useState<IToDoInfo>({ title: "", body: "", isDone: false })
    const param = useParams() as { id: string }
    const context = useContext(ToDoInfoContext)
    if (!context) {
        throw new Error('This must be as IToDoInfoContext[]')
    }
    const { toDoInfo } = context
    const mainToDoInfo = toDoInfo?.find((ele) => ele._id === param.id) as IToDoInfoContext

    useEffect(() => {
        setValueInputs({ ...valueInputs, title: mainToDoInfo?.title, body: mainToDoInfo?.body, isDone: mainToDoInfo?.isDone })
    }, [mainToDoInfo])
    return (
        <div className='flex justify-center items-center h-full mt-10'>
            <div className='grid grid-cols-12 w-[90%] md:w-[70%] xl:w-[60%] gap-2 justify-center items-center rounded-md border p-5 md:p-10'>
                <h2 className='col-span-12 w-[70%] md:w-[40%] text-center m-auto border rounded-md outline-gray-400 p-2'>Task Information</h2>
                <h2 className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2'>{valueInputs?.title}</h2>
                <p className='col-span-12 w-[100%] m-auto border rounded-md outline-gray-400 p-2'>{valueInputs?.body}</p>

                {valueInputs?.title && <fieldset className="col-span-12 flex flex-wrap justify-center gap-3">
                    {valueInputs?.isDone ?
                        <h3 className='w-[50%] border text-center p-2 rounded-md bg-green-600 text-white'>DONE</h3>
                        :
                        <h3 className='w-[50%] border text-center p-2 rounded-md bg-red-600 text-white'>NOT DONE</h3>
                    }
                </fieldset>}


                <Link href={`/task/${param.id}/options`} className='col-span-12 w-[100%] m-auto border rounded-md text-center bg-yellow-600 text-white p-2' type='submit'>Edit</Link>
            </div>
        </div>
    )
}

export default ToDoControlComponent