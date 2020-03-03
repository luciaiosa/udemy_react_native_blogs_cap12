import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const BlogPostForm = (onSubmit, initialValues, labels) => {

    return (
        <View>
            <Text style={styles.label}>{labels.title}</Text>
            <TextInput value={title} onChangeText={(newValue) => setTitle(newValue)} style={styles.input} />
            <Text style={styles.label}>{labels.content}</Text>
            <TextInput value={content} onChangeText={(newValue) => setContent(newValue)} style={styles.input} />
            <Button title="Save" onPress={() => {

                editBlogPost(title, content, () => {
                    navigation.navigate('Index');
                })

            }} />
        </View>
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

export default BlogPostForm;