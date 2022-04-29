import { Chip,Box,Grow} from "@material-ui/core";
import {Button} from '@chakra-ui/react'
import {useEffect, React,useState} from "react";
import "./sidebar.scss"
import axios from 'axios';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";



const Sidebar = ({genres, selectedGenres, setSelectedGenres, setPageNumber, setGenre}) => {
        const [checked, setChecked] = useState(false);
        const handleChange = () => {
            setChecked((prev) => !prev);
        };
        const icon = (
            <div className="genre">
                    {selectedGenres && 
                        selectedGenres.map((genre) => { 
                            return <Chip 
                                    key={genre.id}
                                    label={genre.name}  
                                    style={{margin:5.5, backgroundColor:'#00acda'}} 
                                    color="primary"            
                                    size="small"
                                    clickable 
                                    onClick={() => handleRemove(genre)}
                                    />
                        })}
                    {genres && 
                        genres.map((genre) => { 
                            return <Chip 
                                    key={genre.id}
                                    label={genre.name}  
                                    style={{margin:5.5}} 
                                    variant="outlined"
                                    size="small"
                                    clickable 
                                    onClick={() => handleAdd(genre)}
                                    />
                        })}
                </div>
          );
        const handleAdd = (genre) => {
            setSelectedGenres([...selectedGenres, genre]);
            setGenre(genres.filter((g) => g.id !== genre.id))
            setPageNumber(1);
        }

        const handleRemove = (genre) => {
            setSelectedGenres(
                selectedGenres.filter((selected) => selected.id !== genre.id)
            );
            setGenre([...genres, genre])
            setPageNumber(1);
        }
        const fetchGenre = async () => {
            const {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)    
            setGenre(data.genres)
            
        }

        useEffect(() => {
        
            fetchGenre()
    
        }, []);

return(
    <>
        
        
        <Box sx={{ height: 180 }} className="color">
     
            <Button 
                checked={checked} 
                onClick={handleChange}
                className='filter'

            
            >{checked? <IoIosArrowDown /> : <IoIosArrowForward />}Filter</Button>
            
            <Box sx={{ display: 'flex' }}>
                <Grow in={checked}>{icon}</Grow>
                {/* Conditionally applies the timeout prop to change the entry speed. */}
                <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                
                >
                {icon}
                </Grow>
            </Box>
        </Box>
    </>
)


}

export default Sidebar