import Link from 'next/link'
import React from 'react'

function NoTaskComponent() {
    return (
        <div className='col-span-12 flex flex-col justify-center items-center gap-5 h-[150px] w-[50%] mx-auto border rounded-md'>
            <h2 className='border bg-yellow-500 text-white rounded-md p-2'>There is no task to show</h2>
            <Link href={'/task'} className='bg-green-500 text-white rounded-md p-2'>ADD TASK</Link >
        </div>
    )
}

export default NoTaskComponent