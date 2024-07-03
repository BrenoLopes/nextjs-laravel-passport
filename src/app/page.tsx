'use client'

import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession()

    console.log({
        userSession: session,
        status
    })

    return (
        <main>
            <h1>Home</h1>
            <p>
                {status === 'authenticated' && 'User is Authenticated'}
                {status === 'unauthenticated' && 'User is unauthenticated'}
            </p>
            {status === 'authenticated' && (
                <>
                    <p className="">
                        Welcome: {session?.user?.name}
                    </p>
                    <button className={'px-4 py-2 rounded bg-slate-800 text-white'} onClick={() => signOut()}>Logout</button>
                </>
            )}
            {status === 'unauthenticated' && (
                <button className={'px-4 py-2 rounded bg-slate-800 text-white'} onClick={() => signIn('passport')}>Login</button>
            )}
        </main>
    );
}
