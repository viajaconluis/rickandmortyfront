import React, { useState } from 'react';
import Select from 'react-select';

const InputGroup = ({ name, changeID, total }) => {
  // Verifica si 'total' es un número válido y si es mayor que 0
  const totalOptions = typeof total === 'number' && total > 0 ? total : 0;

  // Asegúrate de que 'options' siempre sea un array
  const options = totalOptions > 0 
    ? [...Array(totalOptions).keys()].map((x) => ({
        value: x + 1,
        label: `${name} - ${x + 1}`
      })) 
    : []; // Si no hay opciones, inicializa como un array vacío
  
  const [isClearable, setIsClearable] = useState(true);

  return (
    <div>
      <Select
        options={options}
        onChange={(selectedOption) => changeID(selectedOption ? selectedOption.value : null)}
        placeholder="Seleccione..."
        isClearable={isClearable}
      />
      <br />
    </div>
  );
};

export default InputGroup;