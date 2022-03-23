import React, { useEffect, useState } from 'react'
import { request } from '../../../utils/api'; 
// import { Facode } from 'react-icons/fa';
// import axios from 'axios';

import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../config/index'; 
import MainImage from './Sections/MainImage';

function RendingPage() {
  
  const [movies, setMovies] = useState([]);
  const [mainMoiveImage, setmainMoiveImage] = useState("")

  useEffect(async () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const res = await request(endpoint);

    setMovies([...res.results]);
    setmainMoiveImage(res.results[0])
  }, [])

  useEffect(() => {
  }, [movies])

  return (
    <div style={{
      width: '100%', margin: '0'
    }}>

      {mainMoiveImage && 
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${mainMoiveImage.backdrop_path}`} 
        title={mainMoiveImage.original_title}
        desc={mainMoiveImage.overview}
      />}

      <div style={{ width: '85%', margin: '1rem auto'}}>
        <h2>Movies by latest</h2>
        <hr />
      </div>

      <div style={{ display : 'flex', justifyContent: 'center' }}>
        <button>Load More</button>
      </div>
    </div>
  )
}

export default RendingPage