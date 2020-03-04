import createDataContext from './createAutomaticDataContext';

// crear el reducer
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id
                    ? action.payload
                    : blogPost;
            })
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        default:
            return state;
    }
}

// crear las diferentes funciones que vamos a enviar en actions, que va a modificar el reducer
const addBlogPost = (dispatch) => {
    // YA QUE DISPATCH NO ESTÁ DISPONIBLE EN ESTE FICHERO, SINO QUE ESTÁ CREADO SÓLO EN EL Provider DE createAutomaticDataContext, Y NECESITA TENER ACCESO AL METODO dispatch PARA MODIFICAR EL ESTADO
    // así que le pasamos como param dispatch y devolvemos una function que devuelve dispatch({type: 'add_blogpost'}) !!!
    // dispatch({type: 'add_blogpost'}) dispatches an object
    return (title, content, callback) => {
        // Con dispatch se cambia el estado
        dispatch({ type: 'add_blogpost', payload: { title: title, content: content } });
        // callback (param y llamada) se añade en caso de que haya una llamada a una API y necesitamos que espere primero la respuesta, antes de llamar la función
        callback();
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content) => {
        dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
    }
}

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id });
    }
}

// llamar createDataContext, y le pasamos el reducer, un objeto con todas las actions, y el valor inicial del estado
// va a devolver el Contexto y el Provider, un componente que hace los datos disponibles en el resto de componentes de la app
export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost, editBlogPost }, []);

// const addBlogPost = (dispatch) => {
//     return (title, content, callback) => {
//         dispatch({ type: 'add_blogpost', payload: {title : title, content: content } });
//         callback();
//     }
// }

// Con una llamada a la API sería así:

// const addBlogPost = (dispatch) => {
//     return async (title, content, callback) => {
//         try {
//             await axios.post("loquesea", title, content);
//             dispatch({ type: 'add_blogpost', payload: {title : title, content: content } });
//             callback();
//         } catch (e) {
//             console.log("catch exception");
//         }
//     }
// }

