import React from "react";

function ListaAlumnos({ alumnos, onEditar, onEliminar }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Asignatura</th>
          <th>Promedio</th>
          <th>Apreciación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.id}>
            <td>{alumno.nombre}</td>
            <td>{alumno.asignatura}</td>
            <td>{alumno.promedio}</td>
            <td>{alumno.apreciacion}</td>
            <td>
              <button onClick={() => onEditar(alumno)}>Editar</button>
              <button onClick={() => onEliminar(alumno.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaAlumnos;