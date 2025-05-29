"use client";
import Image from 'next/image';
import { useUser } from '../../../provider';
import React from 'react';
import { useRouter } from 'next/navigation';

function WelcomeContainer() {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='bg-white p-5 rounded-xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
                <h2 className='text-lg font-bold'>Welcome Back, {user?.name}</h2>
                <h2 className='text-gray-500 text-sm sm:text-base'>AI-Driven Interviews, Hassle-Free Hiring</h2>
            </div>
            {user && (
                <Image
                    onClick={() => router.push('/settings')}
                    src={user?.picture}
                    alt='user-avatar'
                    width={40}
                    height={40}
                    className='cursor-pointer rounded-full self-end sm:self-auto'
                />
            )}
        </div>
    );
}

export default WelcomeContainer;
