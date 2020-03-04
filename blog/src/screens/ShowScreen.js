import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {FontAwesome} from '@expo/vector-icons';

// no se puede pasar directamente el id como prop de navigation, sino navigation entero, y sacar el id con navigation.getParam('id')!!
const ShowScreen = ({navigation}) => {
    const id = navigation.getParam('id');
    // para traer la info del Context: importar {useContext}, {Context}, guardar en la const state el state de BlogContext: const { state } = useContext(Context)!!
    // BlogContext contiene { state, ...boundActions }!!

    const { state } = useContext(Context);

    // find es un arrays buil-in helper function que devuelve el primer objeto que encuentra que cumple con la condición
    const blogPost = state.find((blogPost) => blogPost.id === id);
    console.log(blogPost);

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    )
};

// añadir navigationOptions a defaultNavigationOptions (App.js)
// Añade en la parte derecha del titulo el icono , que navega a la pantalla Edit al pulsarlo
ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => 
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id')})}>
                <FontAwesome name="pencil" size={30} />
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({

});

export default ShowScreen;