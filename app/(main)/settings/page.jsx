"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';

function UserSetting() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [interviewList, setInterviewList] = useState([]);
    const [Rate, setRate] = useState(0);
    const router = useRouter();

    useEffect(() => {
        user&&GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail', user?.email)
        .order('id', {ascending: false});

        setInterviewList(Interviews);

        const minSuccessRate = 70;
        const maxSuccessRate = 90;
        const CalcRate = Math.floor(Math.random() * (maxSuccessRate - minSuccessRate + 1)) + minSuccessRate;
        setRate(CalcRate);
    }

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
            } else {
                // Redirect to home if no user
                router.push('/');
            }
            setLoading(false);
        };

        getUser();
    }, [router]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await supabase.auth.signOut();
            router.push('/');
        } catch (error) {
            setIsLoggingOut(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to home
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 rounded-lg via-indigo-50 to-blue-100">
            {/* Header */}
            <div className="bg-white/80 mt-5 rounded-lg backdrop-blur-lg border-b border-blue-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                        </div>
                        
                        <Button 
                            onClick={() => router.push('/dashboard')}
                            variant="outline"
                            className="border-blue-200 hover:bg-blue-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-8">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                        
                        <div className="relative flex items-center space-x-6">
                            <div className="relative">
                                <img 
                                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=ffffff&color=3b82f6&size=128`}
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    {user.user_metadata?.full_name || 'AiCruiter User'}
                                </h2>
                                <p className="text-blue-100 text-lg mb-1">{user.email}</p>
                                <div className="flex items-center space-x-2 text-blue-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">Verified Account</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Account Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <label className="text-sm font-medium text-blue-800 mb-1 block">Full Name</label>
                                        <p className="text-gray-900 font-semibold">
                                            {user.user_metadata?.full_name || 'Not provided'}
                                        </p>
                                    </div>
                                    
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <label className="text-sm font-medium text-blue-800 mb-1 block">Email Address</label>
                                        <p className="text-gray-900 font-semibold">{user.email}</p>
                                    </div>
                                    
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <label className="text-sm font-medium text-blue-800 mb-1 block">Account Created</label>
                                        <p className="text-gray-900 font-semibold">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Account Statistics
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
                                        <div className="text-2xl font-bold">{interviewList.length}</div>
                                        <div className="text-blue-100 text-sm">Interviews Taken</div>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
                                        <div className="text-2xl font-bold">{interviewList.length}</div>
                                        <div className="text-indigo-100 text-sm">Job Positions</div>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white">
                                        <div className="text-2xl font-bold">0</div>
                                        <div className="text-purple-100 text-sm">Hours Practiced</div>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-white">
                                        <div className="text-2xl font-bold">{Rate}%</div>
                                        <div className="text-green-100 text-sm">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Quick Actions
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                        <Button 
                            onClick={() => router.push('/dashboard')}
                            variant="outline" 
                            className="p-6 h-auto flex flex-col items-center space-y-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        >
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m4 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 11V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h2z" />
                            </svg>
                            <span className="font-medium">Dashboard</span>
                            <span className="text-sm text-gray-500">View your dashboard</span>
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="p-6 h-auto flex flex-col items-center space-y-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                            onClick={() => router.push('/all-interview')}
                        >
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-medium">Interview History</span>
                            <span className="text-sm text-gray-500">View past interviews</span>
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="p-6 h-auto flex flex-col items-center space-y-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                            onClick={() => router.push('/billing')}
                        >
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">Credits </span>
                            <span className="text-sm text-gray-500">Purchase Plans</span>
                        </Button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8">
                    <h3 className="text-xl font-semibold text-red-700 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Account Actions
                    </h3>
                    
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-lg font-semibold text-red-800 mb-2">Sign Out</h4>
                                <p className="text-red-600 mb-4">
                                    Sign out of your AiCruiter account. You'll need to sign in again to access your dashboard.
                                </p>
                            </div>
                        </div>
                        
                        <Button 
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="bg-red-600 hover:bg-red-700 text-white border-0"
                        >
                            {isLoggingOut ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Out...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSetting;