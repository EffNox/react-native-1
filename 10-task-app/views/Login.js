import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
import { Button, Container, Form, H1, Input, Item, Spinner, Text, Toast, View } from 'native-base'
import React, { useState } from 'react'
import { LOGIN } from '../helpers/gql'
import { showAlert, gbStyle } from '../styles/global'

const Login = ({ navigation }) => {

    const [cor, setCor] = useState('test@test.com')
    const [pwd, setPwd] = useState('123456')

    const [rsLogin, { loading }] = useMutation(LOGIN)

    const hdLogin = async () => {
        let dt = { cor, pwd }
        try {
            const { data: { login } } = await rsLogin({ variables: { dt } })
            if (login?.msg) return showAlert(login?.msg)
            await AsyncStorage.setItem('tk', login.tk)
            navigation.push('project')
        } catch (err) {
            showAlert(err.message)
        }
    }

    return (
        <Container style={gbStyle.container}>
            <View style={gbStyle.contenido}>
                <H1 style={gbStyle.titulo}>Up Task</H1>
                {loading && <Spinner color="white" />}
                <Form>
                    <Item inlineLabel last rounded style={gbStyle.input}>
                        <Input autoCompleteType="email" onChangeText={setCor} value={cor} style={{ color: 'white' }} placeholder="Correo" />
                    </Item>
                    <Item inlineLabel last rounded color="white" style={gbStyle.input}>
                        <Input placeholder="Contraseña" onChangeText={setPwd} value={pwd} style={{ color: 'white' }} secureTextEntry={true} />
                    </Item>
                </Form>
                <Button rounded block style={gbStyle.btn} onPress={hdLogin}><Text style={gbStyle.btnTxt}>Iniciar Sesión</Text></Button>
                <Text style={gbStyle.link} onPress={() => navigation.push('new')}>Crear cuenta</Text>
            </View>
        </Container>
    )
}

export default Login
