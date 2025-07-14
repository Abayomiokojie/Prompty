'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import GoogleLogo from '../public/assets/icons/google-logo.svg'

const Nav = () => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className='flex flex-between w-full mb-16 pt-8'>
            <Link className='flex gap-2 items-center' href={"/"}>
                <Image src={"/assets/images/prompty-1aii.png"} width={50} height={50} alt='Prompty Logo'
                    className='object-contain rounded-full shadow-sm ' />

                <p className='logo_text '>
                    <span className='text-slate-600 font-extrabold text-xl'>
                        Prompty
                    </span>
                </p>

            </Link>

            {/* Desktop Nagivation */}
            <div className='hidden md:flex gap-3 '>
                <Link href="/" className="flex mr-3 lg:mr-12 gap-2 items-center hover:bg-white/90 backdrop-blur hover:outline hover:outline-slate-200/30 rounded-2xl px-4 py-0 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLineJoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home "><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                    <button className='align-middle items-center'>Home</button>
                </Link>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>

                        <button className='outline_btn' type='button' onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image src={session?.user.image} width={37} height={37} alt='Profile picture'
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    className='black_btn gap-2'
                                    onClick={() => signIn(provider.id)}>
                                    Sign In
                                    <Image src={GoogleLogo} className='h4 w-4'></Image>
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Nagivation */}
            <div className='md:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image src={session?.user.image} width={37} height={37} alt='Profile picture'
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    className='black_btn gap-2'
                                    onClick={() => signIn(provider.id)}>
                                    Sign In
                                    <Image src={GoogleLogo} sizes='h4 w-4'></Image>
                                </button>
                            ))}
                    </>
                )}

            </div>
        </nav>
    )
}

export default Nav
