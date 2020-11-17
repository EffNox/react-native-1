import React from 'react'
import { Text, StyleSheet, Platform } from "react-native";

const Header = () => (<Text style={styles.header}>CriptoMonedas</Text>)

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === "android" ? 10 : 50,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    },
})

export default Header
