
import {React} from 'react';
//import CircularProgress from 'react-native-circular-progress-indicator';
import 'react-circular-progressbar/dist/styles.css';
import './card.scss';
import Popup from './Popup/Popup'


function Card({title, element, release_date, rateing}) {

    var percentage = (100/10)*rateing
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function convertDate(date_str) {
    
    if(date_str !== undefined){
        var temp_date = date_str.split("-");
        return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
    }else{
        return ""
    }
    
    }

    if(percentage < 70){
        var path_color = "#cdcf3e"
    }else{
        path_color = "#00c973"
    }

    return (
        <div className='Card' >
            <div className='upper-container'>
                
                <img src={`${element.thumbnail.path}.${element.thumbnail.extension}`} alt='' height="100px" width="100px"/>
            </div>
            <div className="lower-container">

                <h4 className='title'>{element.title}</h4> 
                {element.prices && element.prices.map((price) => (
                    < h4 className='price'>{price.price} €</h4>   
                ))}
                           
                <Popup element={element}/>
            </div>
        </div>
    )
}

export default Card