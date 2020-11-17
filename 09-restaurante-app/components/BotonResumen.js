import { useNavigation } from '@react-navigation/native'
import { Button, Text } from 'native-base'
import React, { useContext } from 'react'
import PedidoContext from '../context/pedidos/pedidosContext'
import gbStyle from '../styles/global'


const BotonResumen = () => {

    const { pedido } = useContext(PedidoContext)

    const navigation = useNavigation();

    if (pedido.length === 0) return null;

    return (
        <Button style={gbStyle.btn} onPress={() => navigation.push('resumen')}>
            <Text style={gbStyle.btnTxt}>Pedido</Text>
        </Button>
    )
}

export default BotonResumen
