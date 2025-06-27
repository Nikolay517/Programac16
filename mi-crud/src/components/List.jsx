import React from 'react';
import Item from './Item';

function List({ alumnos, handleEdit, handleDelete }) { //esto recibe los alumnos y las funciones de editar y eliminar
  // Si no hay alumnos, muestra un mensaje
  return (
    <div className="card">
      <h2>Evaluaciones Guardadas</h2>
      {alumnos.length === 0 ? (
        <p className="mensaje-vacio">No hay evaluaciones guardadas aún. ¡Agrega una!</p>
      ) : (
        alumnos.map((alumno, i) => (
          <Item
            key={i}
            alumno={alumno}
            onEdit={() => handleEdit(i)}
            onDelete={() => handleDelete(i)}
          />
        ))
      )}
    </div>
  );
}

export default List;