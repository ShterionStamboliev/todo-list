'use client'

import React, { FunctionComponent, useContext } from 'react'
import { AuthContext } from '@/app/context/AuthContext'
import UserNavigation from '@/app/util/UserNavigation'
import GuestNavigation from '@/app/util/GuestNavigation'

const Navigation: FunctionComponent = () => {

    const user = useContext(AuthContext);

    return (
        <>
            {user !== null ? <UserNavigation /> : <GuestNavigation />}
        </>
    )
}

export default Navigation