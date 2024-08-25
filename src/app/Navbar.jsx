import React from 'react'
import './navbar.css'
import Link from "next/link";


const Navbar = () => {
    return (
        <div className='navbar'>
        <Link href="/">Home</Link>
        <Link href="/chatbot">Live Demo</Link>
        </div>
    )
}

export default Navbar
