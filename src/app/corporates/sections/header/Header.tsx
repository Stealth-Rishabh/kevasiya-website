
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <section className='header-section border-b border-gray-200 py-4'>
        <div className="px-4 mx-auto">
            <div className="flex justify-between items-center">
                <Image src="/logo.svg" alt="logo" width={200} height={200} />
            </div>
        </div>
    </section>
  )
}

export default Header