import { Body, Button, Footer, FooterTab, Container, Content, Form, Icon, Grid, Col, Text, Input } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import gbStyle from '../styles/global'


const Formulario = ({navigation}) => {

    const [cantidad, setCantidad] = useState(1)
    const { platillo,guardarPedido } = useContext(PedidoContext)
    const { pre } = platillo
    const [total, setTotal] = useState(0)
    const calculaTotal = () => {
        const totalPagar = pre * cantidad;
        setTotal(totalPagar)
    }

    useEffect(() => {
        calculaTotal()
    }, [cantidad])

    const incCan = () => setCantidad(cantidad + 1);
    const decCan = () => (cantidad > 1) && setCantidad(cantidad - 1);
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Aceptar', onPress: () => {
                        const pedido = { ...platillo, cantidad, total }
                        guardarPedido(pedido)
                        navigation.push('resumen')
                    }
                },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )
    }




    return (
        <Container>
            <Content>
                <Form>
                    <Text style={gbStyle.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button dark style={{ height: 80 }}><Icon style={{ fontSize: 40 }} name="remove" onPress={decCan} /></Button>
                        </Col>
                        <Col>
                            <Input
                                style={{ textAlign: 'center', fontSize: 20 }}
                                keyboardType="numeric"
                                value={cantidad.toString()}
                                onChangeText={setCantidad} />
                        </Col>
                        <Col>
                            <Button dark style={{ height: 80 }}><Icon style={{ fontSize: 40 }} name="add" onPress={incCan} /></Button>
                        </Col>
                    </Grid>
                    <Text style={gbStyle.cant}>Subtotal: S/. {total}</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={gbStyle.btn} onPress={confirmarOrden}>
                        <Text style={gbStyle.btnTxt}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default Formulario
