import React, { useEffect, useState } from 'react'
import { View, StyleSheet, } from 'react-native'
import { Button, Headline, TextInput, Paragraph, Portal, Dialog } from 'react-native-paper'
import axios from 'axios';
import gbStyles from '../styles/global'

const NuevoCliente = ({ navigation, route }) => {

    const { item, getData } = route.params;

    const [nom, setNom] = useState('')
    const [tel, setTel] = useState('')
    const [cor, setCor] = useState('')
    const [emp, setEmp] = useState('')
    const [alerta, setAlerta] = useState(false)
    useEffect(() => {
        if (item) {
            const { nom, tel, cor, emp } = item;
            setNom(nom)
            setTel(tel)
            setCor(cor)
            setEmp(emp)
        }
    }, [])

    const save = async () => {
        if (!nom || !tel || !cor || !emp) return showAlert();
        const cliente = { nom, tel, cor, emp }
        try {
            if (item) {
                cliente.id = item.id;
                await axios.put(`http://10.0.2.2:3000/clientes/${item.id}`, cliente)
            } else {
                await axios.post('http://10.0.2.2:3000/clientes', cliente)
            }
            navigation.navigate('home')
            getData()
        } catch (error) {
            console.log(error);
        }
    }

    showAlert = () => setAlerta(!alerta);

    return (
        <View style={gbStyles.contenedor}>
            {   item ?
                <Headline style={gbStyles.titulo}>Actualizar cliente</Headline>
                :
                <Headline style={gbStyles.titulo}>Añadir nuevo cliente</Headline>
            }
            <TextInput style={styles.input} mode="outlined"
                label="Nombre..."
                placeholder="Juan"
                onChangeText={setNom} value={nom}
            />
            <TextInput style={styles.input} mode="outlined"
                label="Teléfono..."
                placeholder="1234567"
                onChangeText={setTel} value={tel}
            />
            <TextInput style={styles.input} mode="outlined"
                label="Correo..."
                placeholder="test@test.com"
                onChangeText={setCor} value={cor}
            />
            <TextInput style={styles.input} mode="outlined"
                label="Empresa..."
                placeholder="Empresa .INC"
                onChangeText={setEmp} value={emp}
            />
            {   item ?
                <Button icon="refresh" mode="outlined" color="teal" onPress={save}>Actualizar</Button>
                :
                <Button icon="content-save" mode="outlined" color="green" onPress={save}>Guardar</Button>
            }
            <Portal>
                <Dialog visible={alerta} onDismiss={showAlert}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="contained" onPress={showAlert}>Aceptar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        // backgroundColor: 'transparent',
    }
})


export default NuevoCliente
