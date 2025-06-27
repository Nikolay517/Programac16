import React from 'react';

function Form({ // Props: nombre, setNombre, asignatura, setAsignatura, promedio, setPromedio, handleSubmit, editIndex, errores
  nombre,
  setNombre,
  asignatura,
  setAsignatura,
  promedio,
  setPromedio,
  handleSubmit,
  editIndex,
  errores
}) {
  return (
    <form onSubmit={handleSubmit}> 
      <label>Nombre del Alumno:</label>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <label>Asignatura:</label>
      <input
        type="text"
        placeholder="Ej: Matemáticas"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />
      {errores.asignatura && <p className="error">{errores.asignatura}</p>}

      <label>Promedio (1.0 - 7.0):</label>
      <input
        type="number"
        step="0.1"
        min="1"
        max="7"
        placeholder="Ej: 5.5"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />
      {errores.promedio && <p className="error">{errores.promedio}</p>}

      <button type="submit">
        {editIndex !== null ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
    </form>
  );
}

export default Form;