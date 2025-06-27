import React from 'react';

function Item({ alumno, onEdit, onDelete }) { //esto recibe un objeto alumno y dos funciones para editar y eliminar
  return (
    <div className="alumno-card">
      <div className="alumno-info">
        <p><strong>Alumno:</strong> {alumno.nombre}</p>
        <p><strong>Asignatura:</strong> {alumno.asignatura}</p>
        <p><strong>Promedio:</strong> {alumno.promedio.toFixed(1)}</p>
        <span className={`badge ${alumno.escala.toLowerCase().replace(' ', '-')}`}>
          {alumno.escala}
        </span>
      </div>
      <div className="buttons">
        <button className="edit" onClick={onEdit}>Editar</button>
        <button className="delete" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default Item;