import React, { useState, useEffect } from "react";

const calcularApreciacion = (promedio) => {
  if (promedio < 4.0) return "Deficiente";
  if (promedio < 5.6) return "Con mejora";
  if (promedio < 6.5) return "Buen trabajo";
  return "Destacado";
};

function Formulario({ onAgregar, alumnoEditando }) {
  const [nombre, setNombre] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [promedio, setPromedio] = useState("");

  useEffect(() => {
    if (alumnoEditando) {
      setNombre(alumnoEditando.nombre);
      setAsignatura(alumnoEditando.asignatura);
      setPromedio(alumnoEditando.promedio);
    }
  }, [alumnoEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !asignatura || !promedio) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevoAlumno = {
      id: alumnoEditando?.id || null,
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
      apreciacion: calcularApreciacion(parseFloat(promedio)),
    };

    onAgregar(nuevoAlumno);
    setNombre("");
    setAsignatura("");
    setPromedio("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Asignatura" value={asignatura} onChange={(e) => setAsignatura(e.target.value)} />
      <input type="number" step="0.1" placeholder="Promedio" value={promedio} onChange={(e) => setPromedio(e.target.value)} />
      <button type="submit">{alumnoEditando ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}

export default Formulario;