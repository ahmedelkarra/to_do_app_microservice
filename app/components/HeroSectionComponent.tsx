import React from 'react'
import todoPhoto from '../public/to-do-list.jpeg'

function HeroSectionComponent() {
    return (
        <section className='col-span-12'>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <img
                            alt=""
                            src={todoPhoto?.src}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">TaskTrackr: Turn Tasks into Triumphs</h2>

                        <p className="mt-4 text-gray-600">
                            Every small task completed brings you closer to achieving your big goals!
                            Organize your day, set your priorities, and start making your dreams a reality today
                        </p>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default HeroSectionComponent