import { useState } from 'react'
import './App.css';
import Row from './component/Row.jsx';
import requests from './requests.js';
import Banner from './component/Banner.jsx';
import Nav from './component/Nav.jsx';
import './App.css'
import Footer from './component/Footer.jsx';

function App() {
  const existingPlaylist = JSON.parse(localStorage.getItem("myplaylist")) || [];
  // let existingPlaylist = [{title: 'ram', url: "http://"},{title: "syaml", url: "http://"}]
  console.log("exiting", existingPlaylist);
	const [myplaylist, setMyplaylist] = useState(existingPlaylist)
  console.log("initial",myplaylist);
  // localStorage.setItem('myplaylist',JSON.stringify(myplaylist));
	// Array.isArray(myplaylist) ? console.log("arrray") : console.log("not");
  return (
    <>
      <Nav />
			<Banner myplaylist={myplaylist} setMyplaylist={setMyplaylist}/>
			<Row title="NETFLIX ORIGINALS" isLargeRow fetchUrl={requests.fetchNetflixOriginals} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Trending" fetchUrl={requests.fetchTrending} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated}myplaylist={myplaylist}
        setMyplaylist={setMyplaylist} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} myplaylist={myplaylist}
        setMyplaylist={setMyplaylist}/>
      <Footer/>
        
    </>
  )
}

export default App
