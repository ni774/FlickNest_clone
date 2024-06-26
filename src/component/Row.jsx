import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "../style/row.css";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  // console.log(movies);

  const handleClick = (movie) => {
    setShowTrailer(!showTrailer);
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }

  const closeTrailer = () => {
    setTrailerUrl('');
    setShowTrailer(false);
  };

  return (
    <div className="row">
      <h2 style={{backgroundColor: "black"}}>{title}</h2>
      <div className="row_posters">
        {movies.map(movie => {
          return <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} 
            />
        })}
      </div>
      {
        showTrailer &&
        <div className="trailerShow"    style={{ padding: "40px" }}>
          <button onClick={closeTrailer}>X</button>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      }
      
    </div>
  );
}

export default Row;
