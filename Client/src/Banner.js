import React, { useState, useEffect } from 'react'
import axios from './axios';
import './CSS/Banner.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function Banner() {
    const [game, setGame] = useState([]);

    useEffect(async () => {
        const result = await axios('http://localhost:5002/banner',
      );
      setGame(result.data);
      return result;
    }, []);

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    }

    function truncate(str,n) {
        return str?.length >n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <Carousel prevIcon="" prevLabel="" nextIcon="" nextLabel="" style={{marginBottom: '30px',}}>
            {game.map(game =>(
                    <Carousel.Item className="banner"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(
                            ${game.background_image}
                        )`,
                        backgroundPosition: "centre centre",
                    }}>
                        <div className="banner_contents">
                            <h1 className = "banner_recommendation">Our Recommendation</h1>
                            <Link to={{
                                pathname: `/game/${game.id}`,
                                state: game
                            }} key={game.id} className="row_title" onClick={refreshPage}>
                                <h1 className="banner_title">
                                    {game.name}
                                </h1>
                            </Link>
                            <h1 className="banner_description">{truncate(game.description, 250)}</h1>
                        </div>
                        
                    </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Banner
