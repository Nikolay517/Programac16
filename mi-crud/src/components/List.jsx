import React from 'react';
import Item from './Item'; // Importa el componente que muestra la información de cada alumno

// Componente funcional que recibe:
// - alumnos: un arreglo con los datos de cada alumno
// - handleEdit: función para editar un alumno (recibe el índice)
// - handleDelete: función para eliminar un alumno (recibe el índice)
function List({ alumnos, handleEdit, handleDelete }) {
  return (
    <div className="card">
      <h2>Evaluaciones Guardadas</h2>

      {/* Si no hay alumnos, muestra un mensaje indicativo */}
      {alumnos.length === 0 ? (
        <p className="mensaje-vacio">
          No hay evaluaciones guardadas aún. ¡Agrega una!
        </p>
      ) : (
        // Si hay alumnos, los recorre con .map() y crea un Item para cada uno
        alumnos.map((alumno, i) => (
          <Item
            key={i} // Clave única para identificar el componente en la lista
            alumno={alumno} // Pasa el objeto alumno al componente hijo
            onEdit={() => handleEdit(i)} // Pasa la función de editar con el índice
            onDelete={() => handleDelete(i)} // Pasa la función de eliminar con el índice
          />
        ))
      )}
    </div>
  );
}

export default List; // Exporta el componente para ser usado en otros archivos