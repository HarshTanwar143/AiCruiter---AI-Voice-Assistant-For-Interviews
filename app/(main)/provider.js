"use client"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'


function DashboardProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className=' w-full bg-[#F3F4F6]'>
                <SidebarTrigger className=' cursor-pointer' />
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider
