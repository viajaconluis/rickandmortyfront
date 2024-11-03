import React, { useState, useEffect } from "react";

const CardDetails = ({ id }) => {
  const [fetchedData, updateFetchedData] = useState({});
  const { name, location, origin, gender, image, status, species } = fetchedData;

  const api = `https://rickandmortyapi.com/api/character/${id}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);

  return (
    <div className="d-flex flex-column gap-3">
      <h3 className="text-center">{name}</h3>
      <div align="center">
      <img className="img-fluid" align="center" width="250px" height="250px" src={image} alt={name} />

      </div>
      {status && (
        <div className={`badge fs-5 ${status === "Dead" ? "bg-danger" : status === "Alive" ? "bg-success" : "bg-secondary"}`}>
          {status}
        </div>
      )}
      <div className="content">
        <div>
          <span className="fw-bold">Genero: </span>{gender}
        </div>
        <div>
          <span className="fw-bold">Locacion: </span>{location?.name}
        </div>
        <div>
          <span className="fw-bold">Origen: </span>{origin?.name}
        </div>
        <div>
          <span className="fw-bold">Especie: </span>{species}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;