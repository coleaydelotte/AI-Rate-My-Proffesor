'use client'
import Image from "next/image";
import './bot.css'
import { useEffect } from 'react';
import Link from "next/link";
import heroLogo from '../assets/herologo.png'
import { ChatCentered } from 'phosphor-react';





export default function Home() {



  return (
    <div className="bot">
      <h1 className="bot-title">Professor Bot</h1>
      <div className="bot-text-container">
      <div class="bot-text"><h2>Bot: Hi there! How can I assist you today?</h2></div>
  <div class="person-text"><h2>Person: I'm looking for a good recipe for chocolate chip cookies. Do you have any suggestions?</h2></div>
  <div class="bot-text"><h2>Bot: Of course! Here's a simple recipe for delicious chocolate chip cookies:</h2></div>
  <div class="person-text"><h2>Person: That sounds great! What ingredients do I need?</h2></div>
  <div class="bot-text"><h2>Bot: You'll need flour, butter, sugar, eggs, vanilla extract, baking soda, salt, and chocolate chips. Would you like the exact measurements?</h2></div>
  <div class="person-text"><h2>Person: Yes, please! And how long do I bake them for?</h2></div>
  <div class="bot-text"><h2>Bot: Bake them at 350°F (175°C) for about 10-12 minutes, or until the edges are golden brown. Let them cool on the baking sheet for a few minutes before transferring to a wire rack.</h2></div>
  <div class="person-text"><h2>Person: Perfect, thank you! One last question - can I add nuts to this recipe?</h2></div>
  <div class="bot-text"><h2>Bot: Absolutely! Chopped walnuts or pecans work great in this recipe. Just add about 1/2 to 1 cup of chopped nuts when you mix in the chocolate chips.</h2></div>
  <div class="person-text"><h2>Person: Awesome, I can't wait to try these! Thanks for your help.</h2></div>



        

      </div>
      <div className="inputLabel">
      <input  placeholder="Enter Message Here"/>
      <ChatCentered size={32} color="white"/>
      </div>


    </div>
  );
}
