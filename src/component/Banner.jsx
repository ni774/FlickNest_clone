import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import requests from '../requests.js';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "../style/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // console.log("ye hai",movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      setShowTrailer(false);
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
            setShowTrailer(true);
          } else {
            console.log("Trailer not found");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const closeTrailer = () => {
    setTrailerUrl('');
    setShowTrailer(false);
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <header className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
          )`,
          backgroundPosition: "center center"
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner_buttons">
            <button className="banner_button" onClick={() => handleClick(movie)}>Play</button>
            <button className="banner_button">My List</button>
            <button className="banner_button" onClick={()=>{window.location.reload(true)}}>Refresh</button>
          </div>
          <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>
      {showTrailer && (
        <div className="trailerShow" style={{ padding: "40px" }}>
          <button onClick={closeTrailer}>X</button>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      )}
    </>
  );
}

export default Banner;
