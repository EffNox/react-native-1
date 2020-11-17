import React from 'react'
import { StyleSheet, Text, View,  } from "react-native";

const Cotizacion = ({ response }) => {
    if (!Object.keys(response).length) return null;
    return (
        <>
            <View style={styles.rs}>
                <Text style={[styles.text, styles.price]}>
                    <Text style={styles.span}> {response.PRICE} </Text>
                </Text>
                <Text style={styles.text}>Precio más alto del día {' '}
                    <Text style={styles.span}> {response.HIGHDAYDAY} </Text>
                </Text>
                <Text style={styles.text}>Precio más bajo del día {' '}
                    <Text style={styles.span}>{response.LOWDAY} </Text>
                </Text>
                <Text style={styles.text}>Valoración últimas 24 horas: {' '}
                    <Text style={styles.span}> {response.CHANGEPCT24HOUR} % </Text>
                </Text>
                <Text style={styles.text}>Última actualización: {' '}
                    <Text style={styles.span}> {response.LASTUPDATE} </Text>
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    rs: {
        backgroundColor: '#5E49E2',
        padding: 20,
        marginTop: 20
    },
    price: {
        fontSize: 38
    },
    text: {
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10
    },
    span: {
        fontFamily: 'Lato-Black',
    },
})

export default Cotizacion
