import React, { useContext } from 'react';
// hooks (useContext) = funciones que añaden funcionalidades extra a componentes de tipo función. 

import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
// import { Context as ImageContext} from '../context/ImageContext';

import {Feather} from '@expo/vector-icons';

const IndexScreen = () => {
    // Todo lo que hay que hacer para usar el Context y sus datos, es crear el contexto, en BlogContext, y en <BlogContext.Provider value={posts}> pasarle al Provider todos los datos

    // useContext hace que se pueda usar BlogContext en este componente, con los datos que este contiene!!
    // ESTO ES TODO QUE HACE FALTA PARA USAR EL Contexto!!! const value = useContext(BlogContext);

    const { state, addBlogPost } = useContext(BlogContext);

    return (
        <View style={styles.container}>
            {/* onPress={() => addBlogPost()} es lo mismo que abajo, solo que un metodo sin params llama otro metodo, entonces se le pasa solo la referencia a ese metodo!! */}
            <Button title="Add Post" onPress={addBlogPost} />
            <FlatList
                data={state}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.title}</Text>
                            <Feather name="trash" />
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default IndexScreen;

