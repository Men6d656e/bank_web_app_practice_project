"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'




function AuthForm({ type }: { type: string }) {
    
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isloading, setisloading] = useState(false);

    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setisloading(true)
        try {
            // sign up with appwrite & create plan link token
            if ( type === 'sign-up' ) {
                const newUser = await signUp(values)
                setUser(newUser)
            }

            if ( type === 'sign-in' ) {
                const response = await signIn({
                    email : values.email,
                    password : values.password,
                })

                if ( response ) router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setisloading(false)
        }
    }

    return (
        <section className="auth-form">
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='cursor-pointer flex items-center gap-1 '>
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='logo'
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Horizon
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3 items-center">
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        {
                            user ?
                                'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign up'
                        }
                    </h1>
                    <p className="text-16 font-normal text-gray-600 "  >
                        {
                            user ?
                                'Link your account to get started' : 'Please enter your details'
                        }
                    </p>
                </div>
            </header>
            {
                user ? (
                    <div className='flex flex-col gap-4'>
                        {/* plaidLink */}
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {
                                    type === 'sign-up' && (
                                    <>
                                        <div className='flex gap-4'>

                                        <CustomInput control={form.control} name="firstName" label="First Name" placeholder='Enter your first name' />
                                        <CustomInput control={form.control} name="lastName" label="Last Name" placeholder='Enter your last name' />
                                        </div>
                                        <CustomInput control={form.control} name="address1" label="Address" placeholder='Enter your address' />
                                        <CustomInput control={form.control} name="city" label="City" placeholder='Enter your city' />
                                        <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="state" label="State" placeholder='Example: NY' />

                                        <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder='Exmple: 11101' />
                                        </div>
                                        <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder='YYYY-MM-DD' />
                                        <CustomInput control={form.control} name="ssn" label="SSN" placeholder='Example:1234' />
                                        </div>
                                        </>
                                    )
                                }
                                <CustomInput control={form.control} name="email" label="Email" placeholder='Enter your email' />
                                <CustomInput control={form.control} name="password" label="Password" placeholder='Enter your password' />

                                <div className='flex flex-col gap-4'>

                                    <Button type="submit" disabled={isloading} className='form-btn'>
                                        {isloading ? (
                                            <>
                                                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                            </>
                                        ) : type === 'sign-in' ? 'Sign In' : 'Sign up'}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <footer className='flex justify-center gap-1 '>
                            <p className='text-14 font-normal text-gray-600'>
                                {type === 'sign-in' ? 'Don\'t have an account?' : 'Already have an account?'}
                            </p>
                            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                            </Link>
                        </footer>
                    </>
                )
            }
        </section>
    )
}

export default AuthForm