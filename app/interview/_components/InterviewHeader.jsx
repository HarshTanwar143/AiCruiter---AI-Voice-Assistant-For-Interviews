"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function InterviewHeader() {
    return (
        <div className='flex px-4 items-center shadow-gray-200 shadow-2xl border h-20'>
            <Link href={'/'}>
                <Image src={'/logo.png'} width={200} height={100} alt='logo' />
            </Link>
        </div>
    )
}

export default InterviewHeader
