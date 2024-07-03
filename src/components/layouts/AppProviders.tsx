'use client'

import React, {FC} from "react";
import {SessionProvider} from "next-auth/react";

const AppProviders: FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="children">
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default AppProviders