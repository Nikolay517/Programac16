//Importa React y el componente Item que se usará para mostrar cada ítem individual
import React from "react";
import Item from "./Item";

//Componente funcional List que recibe tres props:
//items: array de objetos que representan los ítems a mostrar
//deleteItem: función que se encarga de eliminar un ítem
//editItem: función que se encarga de editar un ítem
function List({ items, deleteItem, editItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      ))}
    </ul>
  );
}

//Exporta el componente List para que pueda ser utilizado en otros archivos
export default List;