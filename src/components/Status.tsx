import { FC }  from 'react'

interface StatusProps {
  isOn: boolean
}

const Status: FC<StatusProps> = ({
  isOn
}) => {
  if(isOn) {
    return (
      <div className='flex items-center justify-center my-10'>
        <div className='h-[60px] w-[300px] bg-green-600 bg-opacity-20 rounded-lg flex justify-center items-center'>
          <h1 className='text-green-600 text-opacity-100 text-4xl font-bold'>
            Status: Online
          </h1>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex items-center justify-center my-10'>
        <div className='h-[60px] w-[300px] bg-red-600 bg-opacity-20 rounded-lg flex justify-center items-center'>
          <h1 className='text-red-600 text-opacity-100 text-4xl font-bold'>
            Status: Offline
          </h1>
        </div>
      </div>
    )
  }

}

export default Status
