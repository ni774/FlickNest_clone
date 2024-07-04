import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../style/row.css";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl,myplaylist, setMyplaylist, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  // const [currentMovieId, setCurrentMovieId] = useState(0);
  // const [hovered, setHovered] = useState(null);
  const [bgcolor, setBgcolor] = useState(false)
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };


  // console.log("myplaylist is", typeof myplaylist);
  // Array.isArray(myplaylist) ? console.log("yaha bhi arrray") : console.log("yaha nahi array, not")


  useEffect(() => {
    async function fetchData() {
      //api call to fetch movies
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);



  const opts = {
    height: "100%",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  // console.log("movies is-->",movies);

  const handleClick = (movie) => {
    setShowTrailer(!showTrailer);
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          // console.log("trailer url: " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("trailer urlobject: " + urlParams);
          setTrailerUrl(urlParams.get('v'));
          console.log("now trailer Url is-",trailerUrl)
        }).catch((error) => {
          console.log("not found",error);
          toast("currently unavaulable, try next video");
        });
    }
  }



  const closeTrailer = () => {
    setTrailerUrl('');
    setShowTrailer(false);
  };

  const handleImageError = (event) => {
    event.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXeMySNjwvvK61yM2AvfboJC6nZPSYebVjyw&s";
  };


  //  add current movie to myplaylist
  const handleMyplaylist = (id) => {
    console.log("clicked")
    const movie = movies.find(movie => movie.id === id);
    if(myplaylist.some(movie => movie.id === id))
      return;
    if(movie){
      setMyplaylist(oldValue => [...oldValue, movie]);
    }
    console.log("fav",myplaylist)
    localStorage.setItem("myplaylist",JSON.stringify(myplaylist));
    console.log("Added to My Playlist");
    setBgcolor(true);
  };

  // const handleMouseEnter = (movieId) => {
  //   setHovered(movieId);
  // };

  // const handleMouseLeave = () => {
  //   setTimeout(()=>{
  //     setHovered(false);
  //   },4000)
  // };
 


  
  return (
    <div className="row">
      <ToastContainer/>
      <h2 style={{backgroundColor: "black"}}>{title}</h2>
      <div className="row_posters">
        {movies.map((movie,index) => {
          return (
            <>
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                // onMouseEnter={() => handleMouseEnter(movie.id)}
                // onMouseLeave={handleMouseLeave}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onLoad={() => handleImageLoad(movie.id)}
                onError={handleImageError}
              />
              {loadedImages && (
                <span
                  onClick={() => handleMyplaylist(movie.id)}
                  className={`add_toPlaylist ${bgcolor && "changeColor"}`}
                >
                  <AddCircleTwoToneIcon color="white" />
                </span>
              )}
            </>
          );
        })}
      </div>
      {
        showTrailer &&
        <div className="trailerShow">
          <button className='cancelView' onClick={closeTrailer}>X</button>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          {/* <button className='addToPlaylist' onClick={()=>handleMyplaylist(currentMovieId)}>+</button> */}
        </div>
      }
    </div>
  );
}

export default Row;