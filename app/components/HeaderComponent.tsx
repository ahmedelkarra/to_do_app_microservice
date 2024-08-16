'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import DropdownComponent from './DropdownComponent'
import logo from '@/public/logo.png'

function HeaderComponent({ setIsChange, isUser }: { setIsChange: Dispatch<SetStateAction<boolean>>, isUser: boolean }) {
    const router = useRouter()

    const handleClick = () => {
        localStorage.removeItem('token')
        router.push('/')
        setIsChange(true)
    }
    return (
        <header className="bg-white">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Link className="block text-teal-600" href="/">
                    <span className="sr-only">Home</span>
                    <img src={logo.src} className='w-14 h-14' alt="logo" />
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
                            </li>
                            {isUser && <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/profile"> Profile </Link>
                            </li>}
                            {isUser && <li>
                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/task"> Add Task </Link>
                            </li>}
                            {isUser && <li>
                                <button className="text-gray-500 transition hover:text-gray-500/75" onClick={handleClick}> Logout </button>
                            </li>}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        {!isUser && <div className="sm:flex sm:gap-4">
                            <Link
                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                href="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                href="/register"
                            >
                                Register
                            </Link>
                        </div>}
                        <DropdownComponent setIsChange={setIsChange} isUser={isUser} />
                    </div>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent