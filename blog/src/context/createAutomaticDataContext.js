// funcion que Automatiza la creación de varios contextos usados en la misma app!!
// funcion reutilizable que se puede usar en diferentes sitios en la app para automatizar el proceso de crear Contextos y Providers

import React, { useReducer, createContext } from 'react';

export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (dispatch) => { return () => {}}}
        // PASARLE a addBlogPost dispatch como param!! 
        // Para dudas, ver curso de Udemy, React Native, cap 12, leccion 133 (y 131, 132)

        const boundActions = {};
        for (let key in actions) {
            // key === 'addBlogPost'
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider };
}