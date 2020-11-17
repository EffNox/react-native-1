import React from 'react'
import { Text, StyleSheet, View, Button } from "react-native";

const Inicio = ({ navigation }) => {

    const info = { clienteId: 20, totPagar: 500 }
    const goToNosotro = () => navigation.navigate('Nosotros', info)

    return (
        <View style={styles.contenedor}>
            <Text>Inicio</Text>
            <Button title="Ir a nosotros" onPress={goToNosotro} />
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Inicio
