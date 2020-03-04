import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const BlogPostForm = ({onSubmit, initialValues, labels}) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>{labels.title}</Text>
            <TextInput value={title} onChangeText={(newValue) => setTitle(newValue)} style={styles.input} />
            <Text style={styles.label}>{labels.content}</Text>
            <TextInput value={content} onChangeText={(newValue) => setContent(newValue)} style={styles.input} />
            <Button title="Save" onPress={() => onSubmit(title, content)} />
        </View>
    )
};

// MUY IMPORTANTE!! AÑADIR VALORES POR DEFECTO AL COMPONENTE PARA NO DEVOLVER ERROR EN CASO DE QUE NO SE LE PASA POR PROPS ALGUNOS VALORES
// Por ejemplo, EditScreen le pasa initialValues, CreateScreen no!!
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
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

export default BlogPostForm;