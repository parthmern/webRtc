import React, { useEffect, useState } from 'react';
import { useSocket } from '../providers/Socket';

const HomePage = () => {

  const { socket } = useSocket();

  const [formData, setFormData] = useState({
    emailId: '',
    roomId: ''
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


  // when user joined a room then what

  const handleRoomJoined = ( roomId ) =>{
    console.log("joined room's id =>",roomId);
  }

  useEffect(()=>{
    socket.on("joined-room", (data)=>{
      console.log(data);
    });

    socket.on("user-joined", (data)=>{
      console.log(data);
    });

    socket.on("first", (data)=>{
      console.log(data);
    });

  }, [socket]);


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
          name='roomId'
          placeholder='enter room code'
          value={formData.roomId}
          onChange={handleChange}
        />
        <button type='submit'>Enter in room</button>
      </form>
    </div>
  );
}

export default HomePage;
