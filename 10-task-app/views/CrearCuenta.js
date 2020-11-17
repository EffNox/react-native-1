import { Button, Container, Form, H1, Input, Item, Text, Toast, View } from 'native-base'
import React, { useState } from 'react'
import { gql, useMutation, } from "@apollo/client";
import { showAlert, gbStyle } from '../styles/global'
import { CREATE_USER } from '../helpers/gql';

const CrearCuenta = ({ navigation }) => {

    const [nom, setNom] = useState()
    const [cor, setCor] = useState()
    const [pwd, setPwd] = useState()

    const [createUsuario, { loading }] = useMutation(CREATE_USER)

    const create = async () => {
        if (!nom || !cor || !pwd) return showAlert('Todos los campos son obligatorios')
        if (pwd.length < 6) return showAlert('La contraseña debe contener al menos 6 digitos')
        let dt = { nom, cor, pwd }
        try {
            await createUsuario({ variables: { dt } })//cache-and-network
            showAlert('Cuenta creada correctamente')
            navigation.push('login')
        } catch (error) {
            showAlert(error.message)
        }
    }

    return (
        <Container style={gbStyle.container}>
            <View style={gbStyle.contenido}>
                <H1 style={gbStyle.titulo}>Up Task</H1>
                {loading && <Text style={gbStyle.titulo}>Cargando....</Text>}
                <Form>
                    <Item inlineLabel last rounded style={gbStyle.input}>
                        <Input autoCompleteType="name" onChangeText={setNom} style={{ color: 'white' }} placeholder="Nombre" />
                    </Item>
                    <Item inlineLabel last rounded style={gbStyle.input}>
                        <Input autoCompleteType="email" onChangeText={setCor} style={{ color: 'white' }} placeholder="Correo" />
                    </Item>
                    <Item inlineLabel last rounded color="white" style={gbStyle.input}>
                        <Input placeholder="Contraseña" onChangeText={setPwd} style={{ color: 'white' }} secureTextEntry={true} />
                    </Item>
                </Form>
                <Button rounded block style={gbStyle.btn} onPress={create}><Text style={gbStyle.btnTxt}>Crear cuenta</Text></Button>
            </View>
        </Container>
    )
}

export default CrearCuenta
