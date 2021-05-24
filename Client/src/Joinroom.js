import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from './axios';
import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function Joinroom(props) {

  const history = useHistory();
  const user_id = localStorage.getItem("user");
  const gameid = localStorage.getItem("gameid");
  let Name = "Join";

  const [rooms_data, setRooms] = useState({
    "capacity": [0],
      "rooms": [
          {
              "capacity": 0,
              "game_id": "",
              "host_id": "",
              "room_id": "",
              "room_name": ""
          }
      ]
    });
   
  useEffect(async () => {
        try{ 
            const onSubmit =
                await axios({
                method: 'post',
                url: 'http://localhost:5001/game_id_room_detail',
                data: {"game_id" : gameid}
            })
            if (onSubmit.status == 200){
                setRooms(onSubmit.data.data);
            }
            return onSubmit.status
        }
        catch (err) {
            console.log(err);
        }
    })

  async function SelectRoom(data) {
    let fdata = {room_id: data.room_id, room_name: data.room_name, user_id: user_id};
    try{
      const onSubmit =
        await axios({
          method: 'post',
          url: 'http://localhost:5101/join',
          data: fdata
        })
      if (onSubmit.status == 201){
        const join_message = fdata.user_id + " has joined room";
        let data = {room_id: fdata.room_id, user_id: fdata.user_id , content: join_message}
        try{
            const newuser =
              await axios({
                method: 'post',
                url: 'http://localhost:5103/message/send',
                data: data
                })
            }
            catch (err) {
              console.log(err);
            }
        history.push(`/room/` + data.room_id);
      }
      return onSubmit.status
    }
    catch (err) {
      console.log(err);
    }
  }

  function isLoading(index) {
    try {
      var capacity_set = rooms_data.rooms[0].capacity;
      if (capacity_set == 0) {
        var capacity_set = '';
      }
      else {
        if (rooms_data.capacity[0] == rooms_data.rooms[index].capacity || rooms_data.capacity[0] > rooms_data.rooms[index].capacity) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error(err.message);
    } 
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"  style={{color: 'white'}}>
          ROOMS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Table responsive>
              <thead>
                  <tr style={{color: 'white'}}> 
                      <th>Room ID #</th>
                      <th>Room Name</th>
                      <th>Owner</th>
                      <th>Capacity</th>
                  </tr>
              </thead>
              <tbody>
                    {Array.from(rooms_data.rooms).map((_, index) => ( 
                        <tr style={{color: 'white'}}>
                            {rooms_data.rooms[index].room_id}
                            {localStorage.setItem("roomid", rooms_data.rooms[index].room_id)}
                            <td>{rooms_data.rooms[index].room_name}</td>
                            <td>{rooms_data.rooms[index].host_id}</td>
                            <td> {rooms_data.capacity[0]}/{rooms_data.rooms[index].capacity}
                            
                            <Button 
                                type="submit" 
                                variant="secondary" 
                                style={{float: "right",}}
                                onClick={() => SelectRoom(rooms_data.rooms[index])}
                                disabled={isLoading(index)}
                            >{Name}</Button>
                            </td>
                        </tr>
                    ))}
              </tbody>
          </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Joinroom