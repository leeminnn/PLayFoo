import React from 'react';
import "./CSS/Room.css";
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import Message from './Message';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Div100vh from 'react-div-100vh'


function Room( {match} ) {

    const history = useHistory();
    const [value, setValue] = useState("");
    const room_id = match.params.roomid;
    localStorage.setItem('roomid', room_id);
    const roomid = match.params.roomid

    const handleChange = e => {
        setValue(e.target.value);
    };

    async function handleKeypress(e) {
        var key = e.which;
      if (key === 13) {
        handleSubmit(e);
      }
    };

    async function handleSubmit(e){
        e.preventDefault();
        setValue("");
        let data = {room_id: room_id, user_id: user , content: value}
        try{
          const onSubmit =
            await axios({
              method: 'post',
              url: 'http://localhost:5103/send_message',
              data: data,
              credentials: 'include'
            })
          return onSubmit.status
        }
        catch (err) {
          console.log(err);
        }
    };

    const user = localStorage.getItem("user");
    const [rooms, setRooms] = useState({
        "capacity": "",
        "members": []
    });
   
    useEffect(async () => {
        const result =
            await axios({
              method: 'post',
              url: "http://localhost:5001/room_id_room_detail",
              data: {"room_id":roomid}
            })
      ;
      setRooms(result.data.data);
      return result;
    }, []);

    async function LeaveRoom() {
        let data = {room_id: room_id, user_id: user }
        try{
          const onSubmit =
            await axios({
              method: 'delete',
              url: 'http://localhost:5102/leave',
              data: data
            })
          if (onSubmit.status == 201){
            history.push(`/home`);
          }
          return onSubmit.status
        }
        catch (err) {
          console.log(err);
        }
      }

    return (
      <Div100vh>
        <div className="row">
            <div className="block" style={{height: '15vh'}}></div>
                <div className="float-container">
                    <div class="float-child">
                        <div class="green" style={{float:'left'}}>
                            <div className='title'>
                                <div style={{display: 'inline-flex', position: 'relative', width: '80%'}}>
                                    <h4>
                                    {rooms.room_name}
                                    </h4>
                                </div>
                            
                                <div style={{ display: 'inline-flex', position: 'relative', float: 'right'}}>
                                    <Button variant="danger" onClick={LeaveRoom}>Leave</Button>
                                </div>
                            </div>
                            <div className='messages'>
                                <Message/>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="float-child">
                        <div className="blue" style={{float: 'right', backgroundColor: '#555555'}}>
                            <div>
                                <h5>Members</h5>
                            </div>

                            {Array.from(rooms.members).map((_, index) => (
                                <div className='friend'>
                                    {rooms.members[index]}
                                </div>
                            ))}

                        </div>
                    </div>

                    <div class="float-child">
                        <div style={{display: 'inline-flex', position: 'relative', width: '80%'}}>
                            <input 
                                className='bottom' 
                                type="text" 
                                style={{width:'90%'}} 
                                onKeyPress={handleKeypress}  
                                value={value}
                                onChange={handleChange}
                            ></input>
                            <Button variant="light" 
                                type='submit' 
                                style={{width:'10%'}} 
                                onClick={handleSubmit} 
                            >Send</Button>
                        </div>

                        <div style={{width: '20%', float: 'right',height: '50px',display: 'inline-flex'}} class="float-child">
                            <h5 style={{alignContent: 'center', margin: 'auto'}}>#{user}</h5>
                        </div>
                    </div>
                </div>
        </div>
      </Div100vh>

    )
}

export default Room