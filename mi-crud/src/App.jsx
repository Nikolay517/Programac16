//Importa React y los hooks useState y useEffect
import React, {useState, useEffect} from "react";
//Importa los componentes Form y List que se usarán para agregar, editar y mostrar ítems
import Form from "./components/Form";
import List from "./components/List";
//Importa el archivo CSS para estilos
import "./App.css";

//Componente funcional App que maneja el estado de los ítems y la lógica de agregar, editar y eliminar
function App(){
  //Estado local para manejar los ítems y el ítem que se está editando
  const [items, setItems] = useState([]);
  // Estado para manejar el ítem que se está editando
  const [itemToEdit, setItemToEdit] = useState(null);

  //Efecto que se ejecuta al cargar el componente para recuperar los ítems del localStorage
  //y establecerlos en el estado local
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  //Efecto que se ejecuta cada vez que cambia el estado de los ítems
  //para guardar los ítems en el localStorage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  //Agrega un nuevo ítem o actualiza uno existente
  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      //Si hay un ítem para editar, actualiza su valor
      setItems(items.map(item => item.id === itemToEdit.id ? {...item, value} : item));
      setItemToEdit(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), value }
      ]);
    }
  };
  //Función para eliminar un ítem por su id
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  //Función para establecer el ítem que se va a editar
  const editItem = (item) => {
    setItemToEdit(item);
  };
  //Render del componente
  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}
//Exporta el componente App para que pueda ser utilizado en otros archivos
export default App;
