import React from 'react'
import { Button } from 'react-native-paper'

const BarraSuperior = ({ navigation, }) => {
    const hdPress = () => navigation.navigate('new')

    return (
            <Button onPress={hdPress} color="#FFF" icon="plus">Cliente</Button>
    )
}

export default BarraSuperior
