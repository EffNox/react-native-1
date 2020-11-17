import { Body, Container, Content, Left, List, ListItem, Separator, Text, Thumbnail, View } from 'native-base'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import PedidoContext from '../context/pedidos/pedidosContext'
import gbStyle from '../styles/global'

const Menu = ({ navigation }) => {

    const { menu, getProductos } = useContext(FirebaseContext)
    const { seelectPlatillo } = useContext(PedidoContext)

    useEffect(() => {
        getProductos()
    }, [])

    const showHeading = (cat, i) => {
        if (i > 0) {
            const catAnterior = menu[i - 1].cat;
            if (catAnterior !== cat) return <Separator style={styles.separador}><Text style={styles.separadorTxt}>{cat.toUpperCase()}</Text></Separator>
        }
        return <Separator style={styles.separador}><Text style={styles.separadorTxt}>{cat.toUpperCase()}</Text></Separator>
    }

    return (
        <Container style={gbStyle.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {menu.map((dt, i) => {
                        const { id, nom, des, pre, cat, img } = dt;
                        return <View key={id}>
                            {showHeading(cat, i)}
                            <ListItem thumbnail onPress={() => {
                                seelectPlatillo(dt)
                                navigation.push('detalle')
                            }}>
                                {/* <Thumbnail large square source={{ uri: img }} /> */}
                                <Left>
                                    <Thumbnail large source={{ uri: img }} />
                                </Left>
                                <Body>
                                    <Text >{nom}</Text>
                                    <Text note numberOfLines={2}>{des}</Text>
                                    <Text>Precio: S/. {pre}</Text>
                                </Body>
                            </ListItem>
                        </View>
                    })}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    },
    separadorTxt: {
        color: '#FFDA00',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
})

export default Menu
