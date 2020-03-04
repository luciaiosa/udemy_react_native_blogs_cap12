import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {

    // del contexto, sólo nos interesa el metodo addBlogPost (el state NO), para guardar en el contexto el nuevo post
    const { addBlogPost } = useContext(Context);

    return ( <BlogPostForm 
        // Hay que pasarle a la funcion los valores title, content provenientes de BlogPostForm
            onSubmit={(title, content) => {
                addBlogPost(title, content, () => {
                    navigation.navigate('Index'); 
                })
            }} 
            labels={{title: 'Enter title:', content: 'Enter content:'}}
        />

        // REFACTORIZAR USANDO UN COMPONENTE REUTILIZABLE, BlogPostForm

        // <View>
        //     <Text style={styles.label}>Enter title:</Text>
        //     <TextInput value={title} onChangeText={(newValue) => setTitle(newValue)} style={styles.input} />
        //     <Text style={styles.label}>Enter content:</Text>
        //     <TextInput value={content} onChangeText={(newValue) => setContent(newValue)} style={styles.input} />
        //     <Button title="Add blog post" onPress={() => {
        //         // una manera de navegar a Index una vez se haya creado el post
        //         // Pero no es buena opción cuando se tenga que hacer una llamada a una API para guardar la info en la BBDD, ya que addBlogPost se ejecuta inmediatamente, y en una milesima de segundo
        //         // Entonces no queremos navegar inmediatamente después de hacer la llamada API, sino esperar la respuesta!!

        //         // addBlogPost(title, content);
        //         // navigation.navigate('Index');   

        //         // MEJOR!! Añadir a addBlogPost() un tercer param, un callback a una función que navega a Index!!
        //         // en addBlogPost (BlogContext.js), después de haber guardado la info a la BBDD, se invocará este callback, que navegará al Index!!

        //         addBlogPost(title, content, () => {
        //             navigation.navigate('Index'); 
        //         })

        //     }} />
        // </View>
    )
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default CreateScreen;