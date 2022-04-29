import { Grid, Flex, Button  } from '@chakra-ui/react';
import './home.scss'
import Card from "../components/card"
import Header from "../components/header"
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { useState, useEffect} from 'react'
import useGenre from '../components/hooks/useGenre';

const Home = () => {

    const [content, setContent] = useState([])
    const [genres, setGenre] = useState([])
    const [pagenumber, setPageNumber] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState([])
    const genreforURL = useGenre(selectedGenres);

    
    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pagenumber}&with_genres=${genreforURL}`)      
            setContent(data.results)
  
        
    }
    
    const Loadmore = async () =>{
        
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pagenumber}&with_genres=${genreforURL}`) 
             
        setContent(content => [...content,...data.results])

    }

    useEffect(() => {
        fetchMovies()       
    }, [ genreforURL]);


    useEffect(() => {       
        Loadmore ()
    }, [pagenumber]);

    return(
        <>
            <Header/>
            
            <Sidebar genres={genres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setPageNumber={setPageNumber} setGenre={setGenre}/>
         
            <Flex
            
            direction="column"         
            m="0 26% auto"
            minWidth="69%"
            maxWidth = "100%"
            
            
            >
                    <h1>Popular Movies</h1>
                
                <Grid
                    w="full"
                    gridTemplateColumns="repeat( auto-fit, minmax(20%, 0fr) )"
                    className='grid'
                    marginTop={"-.5cm"}
                >
                    
                    {content && content.map((element) => (
                    <Card 
                    title={element.title || element.name} 
                    movie_id ={element.id} 
                    poster_path={element.poster_path} 
                    release_date={element.release_date || element.first_air_date} 
                    rateing = {element.vote_average}
                    /> 
                    ))}
                </Grid>
                <Button className='load-more' onClick={()=>{setPageNumber(pagenumber + 1);}}>LOAD MORE</Button>
            </Flex>
            
            
            
        </>
    )
}

export default Home;