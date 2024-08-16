'use client'
import ToDoInfoContext from '@/helper/ToDoInfoContext'
import React, { useContext } from 'react'
import ToDoCard from './ToDoCard'
import HeroSectionComponent from './HeroSectionComponent'
import NoTaskComponent from './NoTaskComponent'
import IsUserContext from '@/helper/IsUserContext'

function ToDoComponent() {
    const context = useContext(ToDoInfoContext)
    if (!context) {
        throw new Error('This must be as IToDoInfoContext[]')
    }
    const { toDoInfo } = context

    const UserContext = useContext(IsUserContext)
    if (!UserContext) {
        throw new Error('this must be a boolean')
    }
    const { isUser } = UserContext
    return (
        <div className='grid grid-cols-12 gap-3 mx-10 my-14'>
            <HeroSectionComponent />
            {(isUser && toDoInfo.length === 0) && <NoTaskComponent />}
            {toDoInfo?.map((ele) => {
                return (
                    < ToDoCard ele={ele} key={ele?._id} />
                )
            })}
        </div>
    )
}

export default ToDoComponent