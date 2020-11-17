import { Button, Container, H1, H3, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import PedidoContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import gbStyle from '../styles/global'
import CountDown from 'react-countdown'
import { StyleSheet } from 'react-native'

const Progreso = ({ navigation }) => {

    const { idPedido } = useContext(PedidoContext)
    const [tiempo, setTiempo] = useState(0)
    const [completado, setCompletado] = useState(false)

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes').doc(idPedido)
                .onSnapshot(manejaSnapshot)
        }
        function manejaSnapshot(doc) {
            setTiempo(parseInt(doc.data().tiempoEntrega));
            setCompletado(doc.data().completado);
        }
        obtenerProducto();
    }, [])

    const render = ({ minutes, seconds }) => {
        return <Text style={styles.timepo}>{minutes}:{seconds}</Text>
    }

    return (
        <Container style={gbStyle.contenedor}>
            <View style={[gbStyle.contenido, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center', }}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center', }}>Estamos calculando el tiempo de entrega</Text>
                    </>
                )}

                {!completado && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: 'center', }}>Su orden estará lista en:</Text>
                        <Text style={{ textAlign: 'center', }}><CountDown date={Date.now() + tiempo * 60000} renderer={render} /></Text>
                    </>
                )
                }

                {completado && (
                    <>
                        <H1 style={styles.textoCompletado}>Orden lista</H1>
                        <H3 style={styles.textoCompletado}>Por favor pase a recojer su pedido</H3>
                        <Button full rounded dark onPress={()=>navigation.push('new')}><Text>Comenzar una orden nueva</Text></Button>
                    </>
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    timepo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default Progreso
