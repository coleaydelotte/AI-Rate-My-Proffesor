'use client'
import Image from "next/image";
import './page.css'
import './button.css'
import heroLogo from './assets/herologo.png'
import { useEffect } from 'react';
import slideUp from "./animations/slideUp";
import slideFromLeft from "./animations/slideFromLeft";
import Link from "next/link";



export default function Home() {

  slideUp();
  slideFromLeft();

  return (
    <div className="home">
      <div className="home-grid">

        <div className="home-text slideLeftNone">
          <h1 className="title" >Rate My Professor</h1>
          <p className="subtitle">Rate My Professor is a platform where students can rate professors using an AI-powered chatbot. Provide your insights, and the chatbot will generate a detailed rating based on your input. It's a quick and easy way to help others choose the right classes and share your academic experiences.</p>
          <Link href="/chatbot">
          <button className="started-btn">Get Started</button>
          </Link>

        </div>

        <div className="home-hero">
          <Image className="hero-logo slideUpNone" src={heroLogo}/>
        </div>

      </div>
    </div>
  );
}
