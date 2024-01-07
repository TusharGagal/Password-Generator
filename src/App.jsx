/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numbersAllowed,setNumbersAllowed]=useState(false);
  const [charactersAllowed,setCharactersAllowed]=useState(false);
  const [password,setPassword]=useState();

  const passwordRef=useRef();
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoopqrstuvwxyz"
    if(numbersAllowed) str+="0123456789";
    if(charactersAllowed) str+="!@#$%^&*{}~`[]-+=";
    for(let i=1;i<=length;i++) {
      let char=Math.floor(Math.random()*str.length);
      pass+=str.charAt(char);
    }
    setPassword(pass);

  },[length,charactersAllowed,numbersAllowed,setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,charactersAllowed,numbersAllowed,passwordGenerator])

  return (
    <div className='w-full max-w-3xl mx-auto shadow-md rounded-xl px-4 py-8 text-orange-500 bg-gray-800'>
      <h1 className='text-center text-3xl mb-4'>Password Generator</h1>
      <div className='flex shadow-rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-3 px-4 rounded-l-2xl text-lg'  
        placeholder='Password'
        readOnly 
        ref={passwordRef} />
        <button className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0 rounded-r-2xl hover:bg-blue-500' onClick={copyPasswordToClipBoard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-6'>
        <div className='flex gap-x-1 item-center '>
          <input type="range" 
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className='text-lg'>Length:{length}</label>
        </div>
        <div className='flex gap-x-1 item-center '>
          <input type="checkbox" 
          defaultChecked={numbersAllowed}
          id="numberInput"
          onChange={()=>{setNumbersAllowed(prev=>!prev)}}
          />
          <label htmlFor='numberInput' className='text-lg'>Numbers</label>
        </div>
        <div className='flex gap-x-1 item-center '>
          <input type="checkbox" 
          defaultChecked={charactersAllowed}
          id="characterInput"
          onChange={()=>{setCharactersAllowed(prev=>!prev)}}
          />
          <label htmlFor='characterInput' className='text-lg'>Special Characters</label>
        </div>

      </div>
    </div>
  )
}

export default App
