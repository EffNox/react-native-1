import { Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, H1, Text } from 'native-base'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import PedidoContext from '../context/pedidos/pedidosContext'
import gbStyle from '../styles/global'

const Detalle = ({ navigation }) => {

    const { platillo } = useContext(PedidoContext)
    const { id, nom, pre, des, cat, img, disponible } = platillo;
    return (
        <Container style={gbStyle.contenedor}>
            <Content style={gbStyle.contenido}>
                <H1 style={gbStyle.titulo}>{nom}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={gbStyle.img} source={{ uri: img }} />
                            <Text note style={{ marginTop: 15 }}>{des}</Text>
                            <Text style={gbStyle.cant}>Precio: S/. {pre}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={gbStyle.btn} onPress={() => navigation.push('form')}>
                        <Text style={gbStyle.btnTxt}>Ordenar Platillo</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default Detalle
