"use client"
import Image from 'next/image'
import React from 'react'
import logo from "../../public/logo.png";
import login from "../../public/login.jpg";
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';

const SignIn = () => {

    // Used to Sign in with Google
    const signInWithGoogle = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
                options: {
                    redirectTo: 'https://ai-cruiter-ai-voice-assistant-for-i.vercel.app/'
                }
        });

        if(error){
            toast('Error in signing in with Google');
        }
    }


  return (
    <div className=' bg-[#DDE9FF] flex flex-col items-center justify-center py-12 min-h-screen'>
        <Image 
            src={logo}
            height={200}
            width={200}
            alt="logo"
        />
        
        <div className=' bg-white flex flex-col items-center border rounded-2xl shadow-lg p-10 mt-5'>
            <Image 
                src={login}
                height={300}
                width={400}
                alt="login"
                className=' rounded-2xl'
            />

            <h2 className=' font-bold text-2xl mt-5'>Welcome back</h2>
            <p className=' text-gray-500 text-sm'>Login with your google account</p>
            <Button className=" mt-4 w-full cursor-pointer" onClick={signInWithGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <path fill="white" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.4-4.5z"/>
                </svg>
                Login with Google
            </Button>
        </div>
    </div>
  )
}

export default SignIn
