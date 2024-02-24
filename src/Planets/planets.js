import React, { useState, useEffect } from 'react';
import './planets.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const planetsPerPage = 6; 

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/');
  }, []);

  const fetchPlanets = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch((error) => console.log(error));
  };

  const handleNextPage = () => {
    fetchPlanets(nextPage);
    setCurrentPage((prevPage) => prevPage + 1); 
  };

  const handlePrevPage = () => {
    fetchPlanets(prevPage);
    setCurrentPage((prevPage) => prevPage - 1); 
  };

  const handlePageChange = (page) => {
    fetchPlanets(`https://swapi.dev/api/planets/?page=${page}`);
    setCurrentPage(page);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(planets.length / planetsPerPage);

  // Pagination logic
  const startIndex = (currentPage - 1) * planetsPerPage;
  const endIndex = startIndex + planetsPerPage;
  const planetsToShow = planets.slice(startIndex, endIndex);

  // Dropdown component
  const Dropdown = ({ residents }) => {
    return (
      <select>
        {residents.map((resident, index) => (
          <option key={index}>{resident}</option>
        ))}
      </select>
    );
  };

  return (
    <div className="App" >
      <div className="planets-container">
        {planetsToShow.map((planet, index) => (
          <div key={index} className="planet-card">
            <h2>{planet.name}</h2>
            <p>Climate: {planet.climate}</p>
            <p>Population: {planet.population}</p>
            <p>Terrain: {planet.terrain}</p>
            <h3>Residents:</h3>
            <Dropdown residents={planet.residents} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {prevPage && <button onClick={handlePrevPage}>Previous Page</button>}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)} className={currentPage === page ? "active" : ""}>
            {page}
          </button>
        ))}
        {nextPage && <button onClick={handleNextPage}>Next Page</button>}
      </div>
    </div>
  );
}

export default App;
