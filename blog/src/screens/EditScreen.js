import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {

    // del contexto, nos interesa el state, y el metodo editBlogPost, para editar en el contexto el post
    const { state, editBlogPost } = useContext(Context);

    const id = navigation.getParam('id');

    const blog = state.find(item => item.id === id);

    // REFACTORIZAR USANDO UN COMPONENTE REUTILIZABLE, BlogPostForm
    // const [title, setTitle] = useState(blog.title);
    // const [content, setContent] = useState(blog.content);

    return (<BlogPostForm
                // Hay que pasarle a la funcion los valores title, content provenientes de BlogPostForm
                onSubmit={(title, content) => {
                    editBlogPost(id, title, content, () => {
                        navigation.navigate('Index');
                    })
                }}
                initialValues={{ title: blog.title, content: blog.content }}
                labels={{ title: 'Edit title:', content: 'Edit content:' }} 
            />

        // REFACTORIZAR USANDO UN COMPONENTE REUTILIZABLE, BlogPostForm

        // <View>
        //     <Text style={styles.label}>Edit title:</Text>
        //     <TextInput value={title} onChangeText={(newValue) => setTitle(newValue)} style={styles.input} />
        //     <Text style={styles.label}>Edit content:</Text>
        //     <TextInput value={content} onChangeText={(newValue) => setContent(newValue)} style={styles.input} />
        //     <Button title="Edit blog post" onPress={() => {
        //         // una manera de navegar a Index una vez se haya creado el post
        //         // Pero no es buena opción cuando se tenga que hacer una llamada a una API para guardar la info en la BBDD, ya que editBlogPost se ejecuta inmediatamente, y en una milesima de segundo
        //         // Entonces no queremos navegar inmediatamente después de hacer la llamada API, sino esperar la respuesta!!

        //         // editBlogPost(title, content);
        //         // navigation.navigate('Index');   

        //         // MEJOR!! Añadir a editBlogPost() un tercer param, un callback a una función que navega a Index!!
        //         // en editBlogPost (BlogContext.js), después de haber guardado la info a la BBDD, se invocará este callback, que navegará al Index!!

        //         editBlogPost(title, content, () => {
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

export default EditScreen;