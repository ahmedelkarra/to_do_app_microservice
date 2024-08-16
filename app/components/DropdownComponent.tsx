import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'

function DropdownComponent({ setIsChange, isUser }: { setIsChange: Dispatch<SetStateAction<boolean>>, isUser: boolean }) {
    const [showUp, setShowUp] = useState<boolean>(false)
    const router = useRouter()

    const handleClick = () => {
        localStorage.removeItem('token')
        router.push('/')
        setIsChange(true)
    }
    return (
        <div className="relative">
            <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">

                <button
                    className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                    onClick={() => setShowUp(!showUp)}
                >
                    <span className="sr-only">Toggle menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {showUp && <div
                className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
            >
                <div className="p-2">
                    <Link
                        href="/"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Home
                    </Link>

                    {isUser && <Link
                        href="/profile"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Profile
                    </Link>}

                    {isUser && <Link
                        href="/task"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Add Task
                    </Link>}

                    {!isUser && <Link
                        href="/register"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Register
                    </Link>}

                    {isUser && <button className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" onClick={handleClick}>
                        Logout
                    </button>}
                </div>
            </div>}
        </div>

    )
}

export default DropdownComponent