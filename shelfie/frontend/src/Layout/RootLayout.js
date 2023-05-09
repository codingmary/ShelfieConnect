import React from 'react'
import { Outlet } from 'react-router-dom';
// import styles from '../styles/RootLayout.module.css'
import Header from '../components/Header';

export default function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
