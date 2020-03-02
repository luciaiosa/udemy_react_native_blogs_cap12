// refactorizar y usar useReducer en lugar de useState!!
import React, { useReducer } from 'react';

// import React, {useState} from 'react';
// SIEMPRE QUE NECESITAMOS QUE EL ARRAY DE POSTS SE MODIFIQUE (AÑADIR, MODIFICAR, BORRAR) , USAR state, INCLUSO EN CONTEXT!!!

// BlogContext es un objeto responsable de pasar datos del Provider a cualquiera de los nested children
const BlogContext = React.createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, { title: `Blog post #${state.length + 1}` }];
        default:
            return state;
    }
}

// children = prop children que se le pasa a un hijo, y representa el contenido entre los tags de apertura y cierre de un componente
export const BlogProvider = ({ children }) => {

    // const [posts, setPosts] = useState([]);
    const [posts, dispatch] = useReducer(blogReducer, []); // el segundo prop es el valor por defecto, []

    const addBlogPost = () => {
        dispatch({type: 'add_blogpost'})
    }

    // REFACTORIZAR, Y USAR useReducer!!
    // const addPost = () => {
    //     // con [], creo un nuevo array, que contiene una copia del array posts, más el nuevo post
    //     setPosts([...posts, { title: `Post number ${posts.length + 1}` }]);
    // }

    return (
        // Todos los nested children tendrán acceso al objeto value del Provider, a todos los datos (data) y metodos (addBlogPost) que contiene!!
        // <BlogContext.Provider value={{ data: posts, addBlogPost: addPost }} ></BlogContext.Provider>
        <BlogContext.Provider value={{ data: posts, addBlogPost }} >
            {children}
        </BlogContext.Provider>
    )
};

export default BlogContext;
/* Todo lo que hay que hacer para usar el Context y sus datos, es crear el contexto, y en <BlogContext.Provider value={posts}> pasarle al Provider todos los datos necesarios!!
Con esto, ya se puede usar el Provider, con todos los datos, usando el BlogContext dentro del componente que lo necesita, como el IndexScreen!! */