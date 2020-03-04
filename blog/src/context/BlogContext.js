import createDataContext from './createAutomaticDataContext';
import jsonServer from '../apis/jsonServer';

// crear el reducer
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
            // YA NO HACE FALTA este reducer, PORQUE LOS DATOS SE GUARDAN EN EL SERVIDOR!!
        // case 'add_blogpost':
        //     return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }];
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

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        // response.data === [{}, {}, {}]

        dispatch({type: 'get_blogposts', payload: response.data})
    }
}

// crear las diferentes funciones que vamos a enviar en actions, que va a modificar el reducer
const addBlogPost = (dispatch) => {
    // YA QUE DISPATCH NO ESTÁ DISPONIBLE EN ESTE FICHERO, SINO QUE ESTÁ CREADO SÓLO EN EL Provider DE createAutomaticDataContext, Y NECESITA TENER ACCESO AL METODO dispatch PARA MODIFICAR EL ESTADO
    // así que le pasamos como param dispatch y devolvemos una function que devuelve dispatch({type: 'add_blogpost'}) !!!
    // dispatch({type: 'add_blogpost'}) dispatches an object
    return async (title, content, callback) => {

        await jsonServer.post("/blogposts", {title: title, content: content});

        // Con dispatch se cambia el estado
        // YA NO HACE FALTA LLAMAR dispatch(), PORQUE LOS DATOS SE GUARDAN EN EL SERVIDOR!!
        // dispatch({ type: 'add_blogpost', payload: { title: title, content: content } });
        // callback (param y llamada) se añade en caso de que haya una llamada a una API y necesitamos que espere primero la respuesta, antes de llamar la función
        if (callback) {
            callback();
        }
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {

        await jsonServer.put(`/blogposts/${id}`, {title: title, content: content});
        // aquí hace falta dispatch(), para refrescar el listado
        
        dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
        // Controlar que no falle si no hay un callback
        if (callback) {
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        // aquí hace falta dispatch(), para refrescar el listado
        dispatch({ type: 'delete_blogpost', payload: id });
    }
}

// llamar createDataContext, y le pasamos el reducer, un objeto con todas las actions, y el valor inicial del estado
// va a devolver el Contexto y el Provider, un componente que hace los datos disponibles en el resto de componentes de la app
export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, []);

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

