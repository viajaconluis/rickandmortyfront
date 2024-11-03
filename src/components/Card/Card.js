import React, { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import { Modal, Button } from "react-bootstrap";
import CardDetails from "./CardDetails";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify'; // Importa ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos del toast
import { FaHeart } from 'react-icons/fa'; 
import { FaSave } from "react-icons/fa";

const Card = ({ page, results }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);
    let updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== character.id)
      : [...favorites, character];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Muestra un toast cuando se agregue a favoritos
    if (!isFavorite) {
      toast.success(`${character.name} ha sido agregado a favoritos!`);
    } else {
      toast.info(`${character.name} ha sido eliminado de favoritos!`);
    }
  };

  const saveFavorites = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres guardar tus favoritos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch("http://localhost:4000/crear-favoritos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favorites),
        });

        if (!response.ok) {
          throw new Error("Error al guardar favoritos");
        }

        Swal.fire({
          icon: "success",
          title: "Favoritos guardados con éxito",
          showConfirmButton: true,
          confirmButtonText: "Cerrar",
        });
      
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Hubo un problema al guardar los favoritos",
          showConfirmButton: true,
          confirmButtonText: "Cerrar",
        });
      }
    }
  };

  const openModal = (characterId) => {
    setSelectedCharacterId(characterId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacterId(null);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  let display;

  if (results) {
    display = results.map((x) => {
      let { id, image, name, status, location } = x;
      const isFavorite = favorites.some((fav) => fav.id === id);

      return (
        <div
          key={id}
          className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
          onClick={() => openModal(id)}
          style={{ cursor: "pointer" }}
        >
          <div className={`${styles.card} d-flex flex-column justify-content-center`}>
            <img className={`${styles.img} img-fluid`} src={image} alt={name} />
            <div className={`${styles.content}`}>
              <div className="fs-5 fw-bold mb-4">{name}</div>
              <div className="">
                <div className="fs-6 fw-normal">Ultima Locacion</div>
                <div className="fs-5">{location.name}</div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(x);
              }}
              className={`btn ${isFavorite ? "btn-primary" : "btn-outline-danger"} mt-3`}
            >
              <FaHeart style={{ marginRight: "5px" }} /> 
              {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            </button>
          </div>
          <div className={`${styles.badge} position-absolute badge ${status === "Dead" ? "bg-danger" : status === "Alive" ? "bg-success" : "bg-secondary"}`}>
            {status}
          </div>
        </div>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return (
    <>
      <div className="row">{display}</div>

      {favorites.length > 0 && (
        <div style={{ position: 'fixed', bottom: '20px', left: '1250px', zIndex: '1000'}}>
          <Button 
            onClick={saveFavorites} 
            className="btn btn-info d-flex align-items-center justify-content-center" 
            style={{ borderRadius: "50%", width: "60px", height: "60px" }}
          >
            <FaHeart/> 
          </Button>
          <span>¡Guardar!</span>  
        </div>
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Detalles del personaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCharacterId && <CardDetails id={selectedCharacterId} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contenedor para los toasts */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick 
        draggable 
        pauseOnHover 
      />
    </>
  );
};

export default Card;
