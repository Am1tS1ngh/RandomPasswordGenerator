
import { useState, useCallback, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length ,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [copyState, setCopyState] = useState("Copy")
  const notify = ()=>{
        toast("Password copied!", {
          className: "text-orange-500",
        })
      }
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-_+=[]{}~`"
    for (let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setCopyState("Copy")
    setPassword(pass)
  } , [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
    setCopyState("Copied!")
    notify()
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8   text-orange-500 bg-gray-700'>
    <ToastContainer />
      <h1 className='text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input id="password" className='outline-none w-full py-1 px-3' type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard}className='outline-none bg-orange-500 text-white font-semibold px-3 py-0.5 shrink-0'>{copyState}</button>
      </div>

      <div className='flex test-sm gap-x-2 flex-wrap'>
        <div className="flex items-center gap-x-1">
          <input type="range" min={8} max={100} value={length} className='cursor-pointer' id="length" onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} className='cursor-pointer' id="numberAllowed" onChange={() => {setNumberAllowed((prev)=>!prev)}}/>
          <label htmlFor="numberAllowed">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} className='cursor-pointer' id="charAllowed" onChange={() => {setCharAllowed((prev)=>!prev)}}/>
          <label htmlFor="charAllowed">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
