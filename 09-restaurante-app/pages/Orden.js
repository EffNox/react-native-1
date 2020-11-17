import { useNavigation } from '@react-navigation/native'
import { Button, Container, Text } from 'native-base'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import gbStyle from '../styles/global'

const Orden = ({ navigation: navi }) => {

    const navigation = useNavigation();
    return (
        <Container style={gbStyle.contenedor}>
            <View style={[gbStyle.contenido, styles.contenido]}>
                {/* <Button style={gbStyle.btn} rounded block onPress={() => navi.push('menu')}> */}
                <Button style={gbStyle.btn} rounded block onPress={() => navigation.push('menu')}>
                    <Text style={gbStyle.btnTxt}>Crear nueva orden</Text>
                </Button>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default Orden
