import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import InputGroup from "../components/Filter/category/InputGroup";

const Episodes = () => {
  let [results, setResults] = React.useState([]);
  let [info, setInfo] = useState([]);
  let { air_date, episode, name } = info;
  let [id, setID] = useState(1);

  let api = `https://rickandmortyapi.com/api/episode/${id}`;

   useEffect(() => {
    (async function () {
      try {
        const response = await fetch(api);
        const data = await response.json();

        // Verifica que 'data' y 'data.characters' existan
        if (data && Array.isArray(data.characters)) {
          setInfo(data);
          
          const characterData = await Promise.all(
            data.characters.map((characterUrl) => 
              fetch(characterUrl).then((res) => res.json())
            )
          );
          setResults(characterData);
        } else {
          console.error('Data format is not as expected:', data);
          // Manejar el caso donde no hay personajes
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Manejar el error según sea necesario
      }
    })();
  }, [api])

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center mb-3">
          Nombre del episodio :{" "}
          <span className="text-danger">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
         fecha de emisión : {air_date === "" ? "Unknown" : air_date}
        </h5>
      </div>
      <div className="row">
       <div align="center">
        <div className="col-lg-6 col-6">

        
          <h4 className="text-center">Seleccionar episodio</h4>
          <InputGroup name="Episode" changeID={setID} total={51} />

      </div>
        
        </div>
        <div className="col-lg-12 col-12">
          <div className="row">
            <Card page="/episodes/" results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
