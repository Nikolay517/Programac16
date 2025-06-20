//Importa los hooks useState y useEffect desde React
import React, { useState, useEffect } from 'react';

//Componente funcional Form que recibe dos props:
//addOrUpdateItem: función que se encarga de agregar o actualizar un ítem
//itemToEdit: objeto que representa el ítem que se quiere editar
function Form({addOrUpdateItem, itemToEdit}){
    //Estado local para manejar el valor del input de texto
    const [inputValue, setInputValue] = useState('');

    //Hook useEffect que se ejecuta cada vez que cambia itemToEdit
    //Si hay un ítem para editar, se rellena el input con su valor
    //Si no, se limpia el input (modo agregar)
    useEffect(() => {
        if (itemToEdit) {
            setInputValue(itemToEdit.value); //Modo edición
        } else {
            setInputValue(''); //Modo agregar
        }
    }, [itemToEdit]);
    //Función que maneja el envío del formulario
    const handleSubmit = (e) => {
    e.preventDefault(); //Previene el comportamiento por defecto del formulario (recargar la página)
    if (inputValue.trim()){ //Verifica que el input no esté vacío
        addOrUpdateItem(inputValue); //Llama a la función addOrUpdateItem con el valor del input
        setInputValue(''); //Limpia el input después de agregar o actualizar
    }
};
    //Renderiza un formulario con un input de texto y un botón
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} //Actualiza el estado del input
            />
            <button type="submit">{itemToEdit ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
}

//Exporta el componente Form para que pueda ser utilizado en otros archivos
export default Form;