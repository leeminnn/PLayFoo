import React, { useEffect, useState } from 'react'
import './CSS/Nav.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";

function Nav() {
    const [show, handleShow] = useState(false);
    const user = localStorage.getItem('user');
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >100 ) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    async function getData(){
        localStorage.setItem('user', "");
        localStorage.setItem('roomid', "");
        localStorage.setItem('password', "");
        localStorage.setItem('gameid', "");
    }

    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    }

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div style={{float:'left', width:'95%'}}>
                <Link to={`/home`} onClick={refreshPage}>
                    <img
                        className="nav_logo"
                        src="https://playfoo-image.s3.amazonaws.com/PLayFoo.png"
                    />
                </Link>
            </div>
            <div style={{float:'right', width:'5%'}}>
                <DropdownButton 
                id="dropdown-basic-button" 
                className="nav_avatar"
                >
                    <Dropdown.Item>
                        <img src="https://picsum.photos/100" style={{marginBottom:"5px"}}/>
                        <span>&nbsp;</span>
                        {user}
                    </Dropdown.Item>
                    <Dropdown.Item href="/" onClick={getData}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
            
        </div>
    )
}

export default Nav
