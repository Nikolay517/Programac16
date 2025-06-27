import React from 'react';

// Componente funcional que recibe:
// - alumno: un objeto con los datos de un estudiante
// - onEdit: función que se ejecuta al hacer clic en "Editar"
// - onDelete: función que se ejecuta al hacer clic en "Eliminar"
function Item({ alumno, onEdit, onDelete }) {
  return (
    // Contenedor principal con clase para estilos
    <div className="alumno-card">

      {/* Sección de información del alumno */}
      <div className="alumno-info">
        <p><strong>Alumno:</strong> {alumno.nombre}</p> {/* Muestra el nombre */}
        <p><strong>Asignatura:</strong> {alumno.asignatura}</p> {/* Muestra la asignatura */}
        <p><strong>Promedio:</strong> {alumno.promedio.toFixed(1)}</p> {/* Muestra el promedio con un decimal */}

        {/* Muestra una etiqueta (badge) con la escala (por ejemplo: Aprobado, Reprobado) */}
        <span
          className={`badge ${alumno.escala.toLowerCase().replace(' ', '-')}`}
        >
          {alumno.escala}
        </span>
      </div>

      {/* Botones para editar o eliminar la evaluación */}
      <div className="buttons">
        <button className="edit" onClick={onEdit}>Editar</button> {/* Llama a onEdit al hacer clic */}
        <button className="delete" onClick={onDelete}>Eliminar</button> {/* Llama a onDelete al hacer clic */}
      </div>

    </div>
  );
}

export default Item; // Exporta el componente para usarlo en otros archivos