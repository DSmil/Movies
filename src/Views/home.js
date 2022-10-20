import { Grid, Flex, Button  } from '@chakra-ui/react';
import './home.scss'
import Card from "../components/card"
import Header from "../components/header"
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

        const {data} = await axios.get(`https://gateway.marvel.com/v1/public/comics?${genreforURL}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}&limit=20`) 
            var original_data = JSON.parse(JSON.stringify(data.data)); 
  
            setContent(original_data.results)
        
    }
    
    const Loadmore = async () =>{

        
        const {data} = await axios.get(`https://gateway.marvel.com/v1/public/comics?${genreforURL}&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH_KEY}&limit=20&offset=${pagenumber}`) 
        var original_data = JSON.parse(JSON.stringify(data.data));  
        setContent(content => [...content,...original_data.results])

    }

    useEffect(() => {
       
        fetchMovies() 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreforURL]);


    useEffect(() => {       
        Loadmore ()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagenumber]);

    return(
        <>
            <Header genres={genres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} setPageNumber={setPageNumber} setGenre={setGenre}/>
            
         
            <Flex
            
            direction="column"         
            m="0 12% auto 15%"
            minWidth="70%"
            maxWidth = "100%"
            
            
            >
                <div className='navigation'>Home {'>'} {selectedGenres && selectedGenres.map((el) => (el.name))}</div>
                <Grid
                    w="full"
                    gridTemplateColumns="repeat( auto-fit, minmax(20%, 0fr) )"
                    className='grid'
                >
                    
                    {content && new Set(content.map((element) => (
                    <Card 
                    title={element.title || element.name} 
                    element={element} 
                    release_date={element.release_date || element.first_air_date} 
                    rateing = {element.vote_average}
                    /> 
                    )))}
                </Grid>
                <Button className='load-more' onClick={()=>{setPageNumber(pagenumber + 20);}}>LOAD MORE</Button>
            </Flex>
            
            
            
        </>
    )
}

export default Home;