import createDataContext from './createAutomaticDataContext';

// crear el reducer
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, { title: `Blog post #${state.length + 1}` }];
        default:
            return state;
    }
}

// crear las diferentes funciones que vamos a enviar en actions, que va a modificar el reducer
const addBlogPost = (dispatch) => {
    // YA QUE DISPATCH NO ESTÁ DISPONIBLE EN ESTE FICHERO, SINO QUE ESTÁ CREADO SÓLO EN EL Provider DE createAutomaticDataContext, Y NECESITA TENER ACCESO AL METODO dispatch PARA MODIFICAR EL ESTADO
    // así que le pasamos como param dispatch y devolvemos una function que devuelve dispatch({type: 'add_blogpost'}) !!!
    // dispatch({type: 'add_blogpost'})
    return () => {
        dispatch({type: 'add_blogpost'});
    }
}

// llamar createDataContext, y le pasamos el reducer, un objeto con todas las actions, y el valor inicial del estado
// va a devolver el Contexto y el Provider, un componente que hace los datos disponibles en el resto de componentes de la app
export const { Context, Provider } = createDataContext(blogReducer, {addBlogPost}, []);