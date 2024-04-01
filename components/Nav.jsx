'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

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
            <Link className='flex gap-2 flex-center' href={"/"}>
                <Image src={"/assets/images/prompty-1aii.png"} width={50} height={50} alt='Prompty Logo'
                    className='object-contain rounded-full shadow-sm ' />

                <p className='logo_text '>
                    <span className='text-slate-600 font-extrabold text-xl'>
                        Prompty
                    </span>
                </p>

            </Link>

            {/* Desktop Nagivation */}
            <div className='max-[639px]:hidden sm:flex gap-3 '>
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
                                    className='black_btn'
                                    onClick={() => signIn(provider.id)}>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Nagivation */}
            <div className='sm:hidden flex relative'>
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
                                    className='black_btn'
                                    onClick={() => signIn(provider.id)}>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}

            </div>
        </nav>
    )
}

export default Nav
