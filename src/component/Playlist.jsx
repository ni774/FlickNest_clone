import React, { useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import 'react-toastify/dist/ReactToastify.css';
import "../style/row.css";
import "../style/playlist.css";
import { ToastContainer, toast } from 'react-toastify';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action } from '../redux/index';

const base_url = "https://image.tmdb.org/t/p/original";

function Playlist({ showPlaylist, setShowPlaylist}) {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  
  //redux
  const myplaylist = useSelector(state => state.myPlaylist)
  // console.log("playlist loaded", myplaylist);
  const dispatch = useDispatch();

  const opts = {
    height: "100%",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {
    setShowTrailer(!showTrailer);
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => {
          toast("Currently unavailable, try next video");
        });
    }
  }

  const closeTrailer = () => {
    setTrailerUrl('');
    setShowTrailer(false);
  };

  const closePlaylist = () => {
    setShowPlaylist(false);
  };

  const deleteMyPlaylist = (movieId) => {
    dispatch(action.removeToPlaylist(movieId));
    if (showTrailer) {
      closeTrailer();
    }
  }

  const handleImageError = (event) => {
    event.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXeMySNjwvvK61yM2AvfboJC6nZPSYebVjyw&s";
  };

  return (
    <div className="playlist">
      <button onClick={closePlaylist}>X</button>
      <h2 style={{ color: "black" }}>My Playlist</h2>
      <div className="playlist_row_posters">
        {myplaylist.length >= 1 ? (
          myplaylist.map(movie => (
            <div key={movie.id} style={{ display: "flex", padding: "0" }}>
              <img
                onClick={() => handleClick(movie)}
                className='row_card'
                src={`${base_url}${movie.backdrop_path}`}
                alt={movie.name}
                onError={handleImageError}
              />
              <span className="deletePlaylitButton" onClick={() => deleteMyPlaylist(movie.id)}><RemoveCircleOutlineIcon color="error" /></span>
            </div>
          ))
        ) : (
          "No Favourite movie"
        )}
      </div>
      {showTrailer && (
        <div className="trailerShow">
          <button onClick={closeTrailer}>X</button>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      )}
    </div>
  );
}

export default Playlist;
