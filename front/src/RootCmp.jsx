import React from 'react'
import { Routes, Route } from 'react-router'

import { MainPage } from './pages/MainPage'
import { ResultsPage } from './pages/ResultsPage'
import { LivePage } from './pages/LivePage'


import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<MainPage />} />
                    <Route path="results" element={<ResultsPage />} />
                    <Route path="live/:songId" element={<LivePage />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


