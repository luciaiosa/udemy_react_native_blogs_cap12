import React, { useContext, useEffect } from 'react';
// hooks (useContext) = funciones que añaden funcionalidades extra a componentes de tipo función. 

import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// TouchableOpacity se usa para convertir cualquier elemento en un elemento capaz de responder al hacer click 
import { Context as BlogContext } from '../context/BlogContext';
// import { Context as ImageContext} from '../context/ImageContext';

import { Feather } from '@expo/vector-icons';

// navigation es un prop que hereda de StackNavigator!!
const IndexScreen = ({ navigation }) => {
    // Todo lo que hay que hacer para usar el Context y sus datos, es crear el contexto, en BlogContext, y en <BlogContext.Provider value={posts}> pasarle al Provider todos los datos

    // useContext hace que se pueda usar BlogContext en este componente, con los datos que este contiene!!
    // ESTO ES TODO QUE HACE FALTA PARA USAR EL Contexto!!! const value = useContext(BlogContext);

    const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

    // Para que no haya un bucle infinito de llamadas, no llamamos getBlogPosts() directamente, sino useEffect, con el segundo param un [] vacío, para que sólo se haga la llamada la primera vez que el componente se renderice
    useEffect(() => {
        getBlogPosts();

        // Cada vez que esta pantalla se enfoca, se invocará esta función. Sino, sólo se llamará getBlogPosts una sola vez, y no van a aparecer en Index todos los blogs después de haber creado uno nuevo
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })
        // Con esto, se llama getBlogPosts() la primera vez que el componente se renderice, y también cuando se vuelve a volver a esta página, después de haber creado nuevo post

        // Si se devuelve una función dentro de useEffect(), se llamará en beforeUnmount()!! Sirve para borrar todos los listeners, borrar la caché, etc!!!
        return ()=> {
            listener.remove();
        }
    }, [])

    return (
        <View>
            {/* onPress={() => addBlogPost()} es lo mismo que abajo, solo que un metodo sin params llama otro metodo, entonces se le pasa solo la referencia a ese metodo!! */}
            {/* <Button title="Add Post" onPress={addBlogPost} /> */}
            <FlatList
                data={state}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        // Envuelvo cada item en TouchableOpacity, para que, al pulsar en cualquier sitio de la fila, vaya a la descripción del post!!
                        // navigation.navigate le paso como segundo param un objeto con el id del item, que necesito en la pantalla Show, para saber qué datos pintar
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                {/* Envolvemos el icono (cualquier elemento que necesitamos que haga algo al pulsarlo) en TouchableOpacity!!! */}
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

// añadir navigationOptions a defaultNavigationOptions (App.js)
// Añade en la parte derecha del titulo el icono +, que navega a la pantalla Create al pulsarlo
IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => 
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});
export default IndexScreen;

