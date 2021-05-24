import React from 'react';
import "./CSS/Message.css";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { MdAccountCircle } from 'react-icons/md';

function Message() {
    const room_id = localStorage.getItem('roomid');
    const [message, setMessage] = useState([]);
    async function GetMessages() {
        let data = {room_id: room_id}
        try{
          const onSubmit =
            await axios({
              method: 'post',
              url: 'http://localhost:5003/message_listener',
              data: data
            })
          if (onSubmit.status == 200){
              setMessage(onSubmit.data.data.messages);
          }
          return onSubmit.status
        }
        catch (err) {
          console.log(err);
        }
      }

    useEffect(() => {
        const interval = setInterval(() => {
            GetMessages()
        }, 1000 );
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])

    return (
        <div className='convo'>
            {Array.from(message).map((_, index) => (
                <div className='content' style={{width:'100%'}}>
                    <div>
                        <div style={{float: 'left', width: '50%', fontSize:'18px'}}>
                            <MdAccountCircle size={30}/>&nbsp;
                            {message[index].user_id} &nbsp;
                        </div>
                        <div style={{float: 'right', width: '50%', fontSize:'12px'}}>
                            {message[index].timestamp}
                        </div>
                    </div>

                    <div style={{float:'left', width: '100%', padding: '5px', fontSize:'15px'}}>
                        {message[index].content}
                    </div>
                </div>
            ))}
        </div> 
    )
}
export default Message
