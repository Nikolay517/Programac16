import React from 'react';

// Componente funcional que recibe varias props relacionadas con el formulario
function Form({
  nombre,            // Estado del nombre del alumno
  setNombre,         // Función para actualizar el nombre
  asignatura,        // Estado de la asignatura
  setAsignatura,     // Función para actualizar la asignatura
  promedio,          // Estado del promedio
  setPromedio,       // Función para actualizar el promedio
  handleSubmit,      // Función que maneja el envío del formulario
  editIndex,         // Índice del elemento a editar (si existe)
  errores            // Objeto que contiene mensajes de error para los campos
}) {
  return (
    // Formulario que ejecuta handleSubmit al enviarse
    <form onSubmit={handleSubmit}> 
      
      {/* Campo para el nombre del alumno */}
      <label>Nombre del Alumno:</label>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombre} // Valor del input sincronizado con el estado
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al cambiar
      />
      {/* Si hay error en el nombre, lo muestra */}
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      {/* Campo para la asignatura */}
      <label>Asignatura:</label>
      <input
        type="text"
        placeholder="Ej: Matemáticas"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />
      {/* Si hay error en la asignatura, lo muestra */}
      {errores.asignatura && <p className="error">{errores.asignatura}</p>}

      {/* Campo para el promedio del alumno */}
      <label>Promedio (1.0 - 7.0):</label>
      <input
        type="number"
        step="0.1" // Permite decimales con un paso de 0.1
        min="1"
        max="7"
        placeholder="Ej: 5.5"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />
      {/* Si hay error en el promedio, lo muestra */}
      {errores.promedio && <p className="error">{errores.promedio}</p>}

      {/* Botón que cambia su texto según si se está editando o agregando una evaluación */}
      <button type="submit">
        {editIndex !== null ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
    </form>
  );
}

export default Form; //Exporta el componente para su uso en otras partes