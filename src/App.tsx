import './App.css'
import { useState, useEffect } from 'react'
import Status from './components/Status.tsx'
import { loadState, saveState } from "../public/javascript/chromeStorage.ts"

function App() {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    loadState('extensionActive', (value: boolean) => {
      if (value !== undefined) {
        setIsOn(value);
      }
    });
  }, []);

  useEffect(() => {
    saveState('extensionActive', isOn);
  }, [isOn]);

  return (
    <>
      <div className='flex items-center justify-center my-10'>
        <button className='outline-0  bg-transparent' onClick={() => setIsOn(!isOn)}>
          <img src="./stop.png" width={200} height={200} alt="" className=' hover:scale-110 duration-300' />
        </button>
      </div>

      <Status isOn={isOn} />

      <div className='flex justify-center items-center gap-x-10'>
        <h1 className='font-bold text-4xl'>
          Shorts
        </h1>
        <h1 className='font-bold text-4xl'>
          Reels
        </h1>
        <h1 className='font-bold text-4xl'>
          TikTok
        </h1>
      </div>
      <div className='my-5'>
        <p className='text-lg font-medium'>
          Get a rid of those life sucking apps and start living your life.
        </p>
      </div>
    </>
  )
}

export default App
