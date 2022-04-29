import { BlockRounded } from '@material-ui/icons';
import {React, useState, useEffect} from 'react';
//import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './card.scss'

import axios from 'axios';

function Card({title, movie_id, poster_path, release_date, rateing}) {

    var percentage = (100/10)*rateing
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function convertDate(date_str) {
    
    if(date_str != undefined){
        var temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
    }else{
        return ""
    }
    
    }



    // const [image, setImage] = useState([])

    // const fetchImage = async () => {
    //     const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    //     console.log(data)
    //     setImage(data.results)
    // }
    
    // useEffect(() => {
    //     fetchImage()
    // }, []);



    const img_300 = "https://image.tmdb.org/t/p/w300"
    if(percentage < 70){
        var path_color = "#cdcf3e"
    }else{
        var path_color = "#00c973"
    }
    
    return (
        <div className='Card'>
            <div className='upper-container'>
                <img src={img_300 + poster_path} alt='' height="100px" width="100px"/>
            </div>
            <div className="lower-container">

                <div className='image-container'>
                    <CircularProgressbar 
                    value={percentage} 
                    text={`${percentage}%`}
                    strokeWidth={5}
                    styles={buildStyles({
                        textColor: "white",
                        textSize:"25px",
                        pathColor: [path_color],
                    })}
                     />
                </div>
                <h4>{title}</h4>
                <p>{convertDate(release_date)}</p>
            </div>
        </div>
    )
}

export default Card