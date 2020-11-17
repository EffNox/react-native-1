import Axios from 'axios';
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Headline, Subheading, Text } from 'react-native-paper';
import globalStyles from '../styles/global';

const DetallesCliente = ({ navigation, route }) => {

    const { item: { id, nom, tel, cor, emp }, getData } = route.params;

    const showAlert = () => {
        Alert.alert(
            '¿Deseas eliminar el registro?',
            'El registro eliminado no se puede recuperar',
            [{ text: 'Cancelar' }, { text: 'Aceptar', onPress: deleteDt }]
        )
    }

    const deleteDt = () => {
        try {
            Axios.delete(`http://10.0.2.2:3000/clientes/${id}`)
            getData()
            navigation.navigate('home')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nom}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{emp}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{tel}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{cor}</Subheading></Text>
            <Button mode="contained" icon="delete" color="red" onPress={showAlert}>Eliminar</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    btn: {
        marginTop: 100,
    }
})

export default DetallesCliente
