'use client'
import Image from "next/image";
import './bot.css'
import { useEffect } from 'react';
import { useState } from 'react';
import Link from "next/link";
import heroLogo from '../assets/herologo.png'
import { ChatCentered } from 'phosphor-react';
import slideFromLeft from "../animations/slideFromLeft";
import { Stream } from "openai/streaming";
import { Box, Button, TextField, Stack } from "@mui/material";


export default function Home() {

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the rate my Professor support assistant. How can I help you today?",  
    }
  ])
  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      {role: 'user', content: message},
      {role: 'assistant', content: ''}
    ])
    setMessage('')
  
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}])
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
  
      let result = ''
      return reader.read().then(function processText({done, value}) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text}
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  slideFromLeft()

  return (
    // <div className="bot">
    //   <div className="bot-text-container">
    //     <div class="bot-text"><h2>Bot: Hi there! How can I assist you today?</h2></div>
    //     <div class="person-text"><h2>Person: I'm looking for a good recipe for chocolate chip cookies. Do you have any suggestions?</h2></div>
    //     <div class="bot-text"><h2>Bot: Of course! Here's a simple recipe for delicious chocolate chip cookies:</h2></div>
    //     <div class="person-text"><h2>Person: That sounds great! What ingredients do I need?</h2></div>
    //     <div class="bot-text"><h2>Bot: You'll need flour, butter, sugar, eggs, vanilla extract, baking soda, salt, and chocolate chips. Would you like the exact measurements?</h2></div>
    //     <div class="person-text"><h2>Person: Yes, please! And how long do I bake them for?</h2></div>
    //     <div class="bot-text"><h2>Bot: Bake them at 350°F (175°C) for about 10-12 minutes, or until the edges are golden brown. Let them cool on the baking sheet for a few minutes before transferring to a wire rack.</h2></div>
    //     <div class="person-text"><h2>Person: Perfect, thank you! One last question - can I add nuts to this recipe?</h2></div>
    //     <div class="bot-text"><h2>Bot: Absolutely! Chopped walnuts or pecans work great in this recipe. Just add about 1/2 to 1 cup of chopped nuts when you mix in the chocolate chips.</h2></div>
    //     <div class="person-text"><h2>Person: Awesome, I can't wait to try these! Thanks for your help.</h2></div>
    //   </div>
    //   <div className="inputLabel">
    //     <input  placeholder="Enter Message Here"/>
    //     <ChatCentered size={32} color="white"/>
    //   </div>
    // </div>

    <Box
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column' 
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        direction='column'
        width='500px'
        height='700px'
        border='1px solid black'
        p={2}
        spacing={3}
      >
        <Stack
          direction='column'
          spacing={2}
          flexGrow={1}
          overflow='auto'
          maxHeight="100%"
        >
        {
          messages.map((messages, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={messages.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={messages.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color='white'
                borderRadius={4}
              >
                {messages.content}
              </Box>
            </Box>
          ))
        }
        </Stack>
        <Stack
          direction='row'
          spacing={2}
        >
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
