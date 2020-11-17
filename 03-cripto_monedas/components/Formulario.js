import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Axios from 'axios';


const Formulario = ({ moneda, setMoneda, criptomoneda, setCriptomoneda, setRsApi }) => {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    const [criptomonedas, setCriptomonedas] = useState([])

    // const obtenerMoneda = setMoneda;
    useEffect(() => {
        const getApi = async () => {
            const rs = await Axios.get(url);
            setCriptomonedas(rs.data.Data)
        }
        getApi();
    }, [])
    const hdCotizar = () => {
        if (!moneda || !criptomoneda) return showAlert();
        console.log('Cotizando');
        setRsApi(true)
    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [{ text: 'Aceptar' }]
        )
    }

    return (
        <View>
            <Text style={styles.lbl}>Moneda</Text>
            <Picker selectedValue={moneda} onValueChange={setMoneda}>
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Dolar USD" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>
            <Text style={styles.lbl}>Cryptomoneda</Text>
            <Picker selectedValue={criptomoneda} onValueChange={setCriptomoneda}>
                <Picker.Item label="Seleccione" value="" />
                {criptomonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight style={styles.btnCotizar} onPress={hdCotizar}>
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    lbl: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    txtCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
})

export default Formulario
