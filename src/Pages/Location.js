import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import InputGroup from "../components/Filter/category/InputGroup";

const Location = () => {
  let [results, setResults] = React.useState([]);
  let [info, setInfo] = useState([]);
  let { dimension, type, name } = info;
  let [number, setNumber] = useState(1);

  let api = `https://rickandmortyapi.com/api/location/${number}`;

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(api);
        const data = await response.json();

        // Verifica que 'data' sea un objeto válido y tenga 'residents'
        if (data && Array.isArray(data.residents)) {
          setInfo(data);

          // Mapeo y recuperación de datos de 'residents'
          const residentsData = await Promise.all(
            data.residents.map((residentUrl) =>
              fetch(residentUrl).then((res) => res.json())
            )
          );
          setResults(residentsData);
        } else {
          console.error('Data format is not as expected:', data);
          // Manejar el caso donde no hay residentes
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Manejar el error según sea necesario
      }
    })();
  }, [api]);



  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center mb-3">
          Locacion :
          <span className="text-danger">
            {" "}
            {name === "" ? "Unknown" : name}
          </span>
        </h1>
        <h5 className="text-center">
          Dimension: {dimension === "" ? "Unknown" : dimension}
        </h5>
        <h6 className="text-center">Tipo: {type === "" ? "Unknown" : type}</h6>
      </div>
      <div className="row">
      <div align="center">
        <div className="col-lg-6 col-6">
         
          <h4 className="text-center">Seleccionar Locacion</h4>
          <InputGroup name="Location" changeID={setNumber} total={126} />
        </div>
        </div>  
        <div className="col-lg-12 col-12">
          <div className="row">
            <Card page="/location/" results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
