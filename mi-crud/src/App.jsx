import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';

function App() {
  // Cargamos los alumnos desde localStorage al iniciar
  const [alumnos, setAlumnos] = useState(() => {
    const data = localStorage.getItem('alumnos');
    return data ? JSON.parse(data) : [];
  });

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Estado para manejar errores
  const [errores, setErrores] = useState({});

  // Guardamos en localStorage cada vez que cambia alumnos
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Evalúa la escala según el promedio
  const calcularEscala = (nota) => {
    if (nota < 4.0) return 'Deficiente';
    if (nota < 5.6) return 'Con Mejora';
    if (nota < 6.5) return 'Buen Trabajo';
    return 'Destacado';
  };

  // Valida los campos del formulario
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido.';
    if (!asignatura.trim()) nuevosErrores.asignatura = 'La asignatura es requerida.';
    if (!promedio) {
      nuevosErrores.promedio = 'El promedio es requerido.';
    } else {
      const valor = parseFloat(promedio);
      if (isNaN(valor) || valor < 1 || valor > 7) {
        nuevosErrores.promedio = 'Debe estar entre 1.0 y 7.0.';
      }
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Maneja envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const nuevo = {
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
      escala: calcularEscala(parseFloat(promedio)),
    };

    if (editIndex !== null) {
      const copia = [...alumnos];
      copia[editIndex] = nuevo;
      setAlumnos(copia);
      setEditIndex(null);
    } else {
      setAlumnos([...alumnos, nuevo]);
    }

    // Limpiar formulario
    setNombre('');
    setAsignatura('');
    setPromedio('');
    setErrores({});
  };

  // Carga datos de un alumno al formulario
  const handleEdit = (index) => {
    const alumno = alumnos[index];
    setNombre(alumno.nombre);
    setAsignatura(alumno.asignatura);
    setPromedio(alumno.promedio);
    setEditIndex(index);
    setErrores({});
  };

  // Elimina un alumno
  const handleDelete = (index) => {
    const nuevos = alumnos.filter((_, i) => i !== index);
    setAlumnos(nuevos);
  };

  return (
    <div className="main-container">
      <h1>Evaluación de Alumnos</h1>

      <div className="card">
        <h2>{editIndex !== null ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}</h2>
        <Form
          nombre={nombre}
          setNombre={setNombre}
          asignatura={asignatura}
          setAsignatura={setAsignatura}
          promedio={promedio}
          setPromedio={setPromedio}
          handleSubmit={handleSubmit}
          editIndex={editIndex}
          errores={errores}
        />
      </div>

      <List
        alumnos={alumnos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;