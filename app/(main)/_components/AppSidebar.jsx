"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "../../../public/logo.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SideBarOptions } from '@/services/Constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
    const path = usePathname();

    return (
        <>
            <Sidebar>
                <SidebarHeader className=" flex items-center  mt-5">
                    <Image src={logo} alt='logo' width={200} height={100} className=' w-[250px]' />
                    <Link href={'/dashboard/create-interview'} className=' w-full'>
                        <Button className=" w-full mt-5 cursor-pointer"><Plus/> Create New Interview</Button>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {
                                    SideBarOptions.map((option,index) => {
                                        return (
                                            <SidebarMenuItem key={index} className=' p-1'>
                                                <SidebarMenuButton asChild className={` p-5 ${path===option.path && "bg-blue-200"}`}>
                                                    <Link href={option.path}>
                                                        <option.icon className={`${path === option.path && "text-primary"}`} />
                                                        <span className={`text-[16px] font-medium ${path === option.path && " text-primary"}`}>{option.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })
                                }
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </>
    )
}