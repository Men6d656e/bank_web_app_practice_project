"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Sidebar({user}: SiderbarProps) {
    const pathname = usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/' className='mb-12 cursor-pointer items-center gap-2 flex'>
            <Image className='size-[24px] max-xl:size-14' src="/icons/logo.svg" width={34} height={34} alt="logo" />
            <h1 className='sidebar-logo'>Horizen</h1> 
            </Link>
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
            return (
                <Link href={link.route} key={link.label} className={cn('sidebar-link ' , { 'bg-bank-gradient' : isActive})}>
                    <div className="relative size-6">
                    <Image className={cn({'brightness-[3] invert-0' : isActive})} src={link.imgURL} fill  alt={link.label} />
                    </div>
                    <p className={cn('sidebar-label' , { '!text-white' : isActive})}>{link.label}</p>
                </Link>
            )
        }
    )}
        USER
        </nav>
        Footer

    </section>
  )
}

export default Sidebar