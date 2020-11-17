import { Body, Button, Footer, FooterTab, Container, Content, List, ListItem, Thumbnail, Left, Text, H1 } from 'native-base'
import React, { useContext, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import gbStyle from '../styles/global'
import firebase from '../firebase'

const Resumen = ({ navigation }) => {

    const { pedido, total, showResumen, eliminarProducto, pedidoRelizado } = useContext(PedidoContext)
    useEffect(() => {
        calcularTOtal();
    }, [pedido])

    const calcularTOtal = () => {
        let newTotal = 0
        newTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0)
        showResumen(newTotal);
    }

    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total,
                            orden: pedido,
                            createdAt: Date.now(),
                        }
                        try {
                            const ped = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRelizado(ped.id);
                            navigation.push('progreso')
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                { text: 'Cancelar' }
            ]
        )
    }

    const confirmarEliminacion = id => {
        eliminarProducto(id)
    }

    return (
        <Container style={gbStyle.contenedor}>
            <Content style={gbStyle.contenido}>
                <H1 style={gbStyle.titulo}> Resumen Pedido</H1>
                {
                    pedido.map((platillo, i) => {
                        const { cantidad, pre, img, id, nom } = platillo
                        return <List List key={id + i} >
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large source={{ uri: img }} />
                                </Left>
                                <Body>
                                    <Text>{nom}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: S/. {pre}</Text>
                                    <Button full danger style={{ marginTop: 20 }} onPress={() => confirmarEliminacion(id)}><Text>Eliminar</Text></Button>
                                </Body>
                            </ListItem>
                        </List>
                    })
                }
                <Text style={gbStyle.cant}>Total a pagar: S/. {total}</Text>
                <Button dark onPress={() => navigation.push('menu')} full>
                    <Text style={[gbStyle.btnTxt, { color: 'white' }]}>Seguir comprando</Text>
                </Button>

            </Content>

            <Footer>
                <FooterTab>
                    <Button style={gbStyle.btn} onPress={progresoPedido} full>
                        <Text style={gbStyle.btnTxt}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container >
    )
}

export default Resumen
