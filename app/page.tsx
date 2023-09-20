'use client'
import { RedirectToSignIn, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#DDCAAE] relative overflow-hidden">

      <div className="p-8 bg-linen rounded-lg shadow-2xl w-full max-w-4xl relative">

        {/* Cat PNG */}
        <Image src="/catsitting.png" alt="Cat Silhouette"
          width={96} height={96}
          className="absolute -top-24 right-0 w-24 transform translate-y-2" />

        {/* Dog PNG */}
        <Image src="/doggo.png" alt="Dog Silhouette"
          width={96} height={96}
          className="absolute -top-16 left-16 w-24 transform -translate-y-1 -translate-x-6" />

        {/* Title Section */}
        <div className="text-center mb-20 z-10 animate-fadeIn">
          <SignedIn>
            <h1 className="text-8xl font-semibold text-dimgray-100 mb-5">
              Welcome to Task Tamer!
            </h1>
            <p className="text-3xl text-dimgray-200 mb-10 animate-fadeIn">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Papaya Veterinary Care's Task Management System
            </p>

            {/* Content Sections */}
            <div className="flex justify-center space-x-6 z-10 animate-fadeIn">
              <Link href="/tasks" className="transition-all hover:scale-105 active:shake duration-300 rounded-[30px] bg-[#b8a074]
                                                                   shadow-md hover:shadow-xl py-3 px-5 rounded-xl text-dimgray-200">
                Tasks
              </Link>
              <Link href="/employees" className="transition-all hover:scale-105 active:shake duration-300 rounded-[30px] bg-[#e2b268]
                                                                   shadow-md hover:shadow-xl py-3 px-5 rounded-xl text-dimgray-200">
                Employees
              </Link>
              <Link href="/groups" className="transition-all hover:scale-105 active:shake duration-300 rounded-[30px] bg-[#f0b151]
                                                                   shadow-md hover:shadow-xl py-3 px-5 rounded-xl text-dimgray-200">
                Groups
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </main>
  )
}
