import React from 'react';
import {useState, useEffect} from 'react';
import axios from './axios';
import requests from './Request';
import "./CSS/Genre.css";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


function Genre( {match} ) {

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: theme.spacing(1),
        },
      },
    }));
    const classes = useStyles();
    const name = match.params.name;
    let res = 'fetch' + name.replaceAll(" ", "");
    const fetchURL = requests[res];

    const [genres, setGenre] = useState([]);
   
    useEffect(async () => {
        const genre = await axios(fetchURL,
      );
    setGenre(genre.data);
      return genre;
    }, []);

    function refreshPage() {
      setTimeout(()=>{
          window.location.reload(false);
      }, 500);
    }
    const user = localStorage.getItem('user');

    return (
        <div className="row">
          <div className="block"></div>
            <div>
              <h1 className="row_title" style={{color: 'orange', fontFamily: 'fantasy', marginLeft: '5vh'}}>{name}</h1>
            </div>
            <div className="row_posters">
            <CardDeck>
            <Row xs={2} md={4}>
              {genres.map(genre =>(
                  <Col md={3}>
                    <Card className="card">
                      <Card.Img variant="top" className="card-img-top" key={genre.id} src={genre.background_image}>
                      </Card.Img>
                        <Card.Body>
                          <Card.Title>
                          <Link to={{
                            pathname: `/game/${genre.id}`,
                            state: genre
                          }} key={genre.id} className="row_title" onClick={refreshPage}>
                              <h3>{genre.name}</h3>
                            </Link>
                          </Card.Title>
                          <Card.Text>
                            <div className={classes.root}>
                              <Typography component="legend">Rating</Typography>
                              <Rating name="half-rating-read" defaultValue={genre.rating} precision={0.5} readOnly />
                            </div>
                          </Card.Text>
                          <Card.Text>
                            <h4>Genre:</h4> {genre.genre.map(genre => (
                                    <h6>{genre}</h6>
                                    ))}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">Release date: {genre.released}</small>
                        </Card.Footer>
                      </Card>
                    </Col>
                ))}
                </Row>
            </CardDeck>
            </div>
        </div>
    )
}

export default Genre