import React, { useState } from 'react';
import { useSocket } from '../providers/Socket';

const HomePage = () => {

  const { socket } = useSocket();

  const [formData, setFormData] = useState({
    emailId: '',
    roomCode: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    socket.emit("join-room", formData);
    

  };

  return (
    <div>
      <div>Homepage</div>

      <form className='flex flex-col px-auto w-[50%]' onSubmit={handleSubmit}>
        <input
          className='border-[2px]'
          type='email'
          name='emailId'
          placeholder='enter email'
          value={formData.emailId}
          onChange={handleChange}
        />
        <input
          className='border-[2px]'
          type='text'
          name='roomCode'
          placeholder='enter room code'
          value={formData.roomCode}
          onChange={handleChange}
        />
        <button type='submit'>Enter in room</button>
      </form>
    </div>
  );
}

export default HomePage;
