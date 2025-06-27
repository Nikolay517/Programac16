import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';

function App() {
  // Estado inicial: carga alumnos desde localStorage (si existen), si no, inicia con un arreglo vacío
  const [alumnos, setAlumnos] = useState(() => {
    const data = localStorage.getItem('alumnos');
    return data ? JSON.parse(data) : [];
  });

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');
  
  // Estado que indica si se está editando (índice del alumno en edición), o null si se está agregando uno nuevo
  const [editIndex, setEditIndex] = useState(null);

  // Estado para almacenar mensajes de error del formulario
  const [errores, setErrores] = useState({});

  // Efecto que guarda la lista de alumnos en localStorage cada vez que esta cambia
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Función que determina la escala (evaluación cualitativa) a partir del promedio
  const calcularEscala = (nota) => {
    if (nota < 4.0) return 'Deficiente';
    if (nota < 5.6) return 'Con Mejora';
    if (nota < 6.5) return 'Buen Trabajo';
    return 'Destacado';
  };

  // Función que valida los datos del formulario antes de guardar
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
    return Object.keys(nuevosErrores).length === 0; // Retorna true si no hay errores
  };

  // Función que maneja el envío del formulario (agrega o actualiza una evaluación)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return; // Si hay errores, no continúa

    const nuevo = {
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
      escala: calcularEscala(parseFloat(promedio)),
    };

    if (editIndex !== null) {
      // Si se está editando un alumno existente
      const copia = [...alumnos];
      copia[editIndex] = nuevo;
      setAlumnos(copia);
      setEditIndex(null); // Sale del modo edición
    } else {
      // Si es una nueva evaluación
      setAlumnos([...alumnos, nuevo]);
    }

    // Limpiar el formulario después de guardar
    setNombre('');
    setAsignatura('');
    setPromedio('');
    setErrores({});
  };

  // Función que carga los datos de un alumno en el formulario para edición
  const handleEdit = (index) => {
    const alumno = alumnos[index];
    setNombre(alumno.nombre);
    setAsignatura(alumno.asignatura);
    setPromedio(alumno.promedio);
    setEditIndex(index);
    setErrores({});
  };

  // Función que elimina un alumno de la lista
  const handleDelete = (index) => {
    const nuevos = alumnos.filter((_, i) => i !== index);
    setAlumnos(nuevos);
  };

  // Renderizado principal de la app
  return (
    <div className="main-container">
      <h1>Evaluación de Alumnos</h1>

      {/* Sección del formulario para agregar o editar evaluaciones */}
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

      {/* Lista de evaluaciones guardadas */}
      <List
        alumnos={alumnos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App; //Exporta el componente principal de la aplicación para ser usado en otros archivos