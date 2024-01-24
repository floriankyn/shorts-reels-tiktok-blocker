import './App.css'
import { useState, useEffect } from 'react'
import Status from './components/Status.tsx'
import { loadState, saveState } from "./libs/chromeStorage.ts"

function App() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    loadState('isEnabled', (value: boolean) => {
      if (value !== undefined) {
        setIsEnabled(value);
      }
    });
  }, []);

  useEffect(() => {
    saveState('isEnabled', isEnabled);
  }, [isEnabled]);

  return (
    <>
      <div className='flex items-center justify-center mb-5'>
        <button className='outline-0  bg-transparent' onClick={() => setIsEnabled(!isEnabled)}>
          <img src="./img/stop.png" width={170} height={170} alt="" className=' hover:scale-110 duration-300' />
        </button>
      </div>

      <Status isOn={isEnabled} />

      <div className='flex justify-center items-center gap-x-10'>
        <h1 className='font-bold text-3xl'>
          Shorts
        </h1>
        <h1 className='font-bold text-3xl'>
          Reels
        </h1>
        <h1 className='font-bold text-3xl'>
          TikTok
        </h1>
      </div>
      <div className='my-5'>
        <p className='text-md font-medium'>
          Get a rid of those life sucking apps and start living your life.
        </p>
      </div>

      <div className='flex justify-center items-center gap-x-3'>
        <div className=' bg-gray-800 bg-opacity-20 py-2 px-8 rounded-md border-solid border-black border-2 '>
          <div className='text-sm font-medium flex justify-center items-center gap-x-2'>
            <img src="./img/github-mark.png" width={20} height={20} />
            <a className='text-black' target='_blank' href='https://github.com/floriankyn'>FlorianKyn</a>
          </div>
        </div>
        <div className=' bg-gray-800 bg-opacity-20 py-2 px-8  rounded-md border-solid border-black border-2 '>
          <div className='text-sm font-medium flex justify-center items-center gap-x-2'>
            <img src="./img/github-mark.png" width={20} height={20} />
            <a className='text-black' target='_blank' href='https://github.com/floriankyn/shorts-reels-tiktok-blocker'>Project</a>
          </div>
        </div>
      </div>

      <div>
        <p className='text-sm font-medium text-center mt-5'>
          Made with ❤️ by Florian KYN
        </p>
        <p>
          This app is free, open source and without ads. 
        </p>
      </div>
    </>
  )
}

export default App
