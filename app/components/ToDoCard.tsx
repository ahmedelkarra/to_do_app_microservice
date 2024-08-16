import { IToDoInfoContext } from '@/helper/ToDoInfoContext'
import Link from 'next/link'
import React from 'react'

function ToDoCard({ ele }: { ele: IToDoInfoContext }) {
    const date = new Date(ele?.createdAt).toDateString()
    return (
        <Link href={`/task/${ele?._id}`} className='col-span-12 md:col-span-6 xl:col-span-4'>
            < article
                className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
            >
                <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500"> {date} </time>

                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                        {ele?.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-1">
                        {ele?.isDone ?
                            <span
                                className="whitespace-nowrap rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-600"
                            >
                                DONE
                            </span>
                            :
                            <span
                                className="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-600"
                            >
                                NOT DONE
                            </span>
                        }
                    </div>
                </div>
            </article >
        </Link>

    )
}

export default ToDoCard