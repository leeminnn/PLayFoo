import React from 'react';
import {useState, useEffect} from 'react';
import axios from './axios';
import "./CSS/Genre.css";
import Button from 'react-bootstrap/Button';
import Createroom from "./Createroom";
import Joinroom from "./Joinroom";
import Div100vh from 'react-div-100vh'


function Game( {match} ) {
    const [modalJoin, setModalJoin] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const [games, setGame] = useState([]);
    const game_id = match.params.id;
    localStorage.setItem('gameid', game_id);

    useEffect(async () => {
        const result = await axios('gamedetails?id=' + game_id
      );
      setGame(result.data[0]);
      return result;
    }, []);
    
    return (
      <Div100vh>
        <div className="row" >
          <div className="block"></div>
            <div className='container'>
              <div style={{float: 'left', width: '100%'}}>
                <h1>{games.name}</h1> 
              </div>

              <div style={{height: '520px'}}>
                <div className="img_box">
                  <img
                  style={{width:'55%', height:'auto', marginLeft:'auto', marginRight:'auto', float: 'left', maxHeight: '345px'}}
                  src={games.background_image}/>
                </div>

                <div style={{fontSize: '15px', float: 'right',  width: '40%', overflowY:'scroll', height:'60%'}}>
                  <p>{games.description}</p>
                </div>
              </div>
              
              <div style={{float: 'left',  width: '45%'}}>
                <Button variant="info" style={{float:'left'}} size="small" block onClick={() => setModalShow(true)}>CREATE ROOM</Button>
                <Createroom
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              
              <div style={{float: 'right',  width: '45%'}}>
                <Button variant="dark" style={{float:'right'}} size="small" block block onClick={() =>setModalJoin(true) }>JOIN ROOM</Button>
                <Joinroom
                  show={modalJoin}
                  onHide={() => setModalJoin(false)}
                />
              </div>

              {/* <div className="block" style={{height:'160px'}}></div> */}

            </div>
        </div>
      </Div100vh>
    )
}

export default Game