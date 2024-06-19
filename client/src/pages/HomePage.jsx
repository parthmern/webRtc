import React from 'react'

const HomePage = () => {
  return (
    <div>

        <div>Homepage</div>

        <div className='flex flex-col px-auto w-[50%] '>
            <input className=' border-[2px]' type='email' placeholder='enter email' />
            <input className='border-[2px]'  type='text' placeholder='enter room code' />
            <button >enter in room</button>
        </div>

    </div>
  )
}

export default HomePage ;