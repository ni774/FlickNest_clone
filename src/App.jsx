import Row from './component/Row.jsx';
import requests from './requests.js';
import Banner from './component/Banner.jsx';
import Nav from './component/Nav.jsx';
import './App.css'
import Footer from './component/Footer.jsx';

function App() {
  return (
    <>
      <Nav />
			<Banner/>
			<Row title="FlikNest ORIGINALS" isLargeRow fetchUrl={requests.fetchNetflixOriginals} />
			<Row title="Trending" fetchUrl={requests.fetchTrending} />
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Footer/>
        
    </>
  )
}

export default App
