import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";

const Formulario = ({ search, setSearch, setConsultar }) => {

    const { pais, ciudad } = search;
    const [animacionBtn] = useState(new Animated.Value(1))
    const consultarClima = () => {
        if (!pais || !ciudad) return showAlert();
        setConsultar(true)
    }

    const animacionEntrada = () => Animated.spring(animacionBtn, { toValue: .9, useNativeDriver: !0 }).start()
    const animacionSalida = () => Animated.spring(animacionBtn, { toValue: 1, friction: 1, tension: 30, useNativeDriver: !0 }).start()

    const estiloAnimacion = { transform: [{ scale: animacionBtn }] }

    const showAlert = () => Alert.alert('Error', 'Los campos son obligatorios', [{ text: 'Aceptar' }])

    return (
        <>
            <View>
                <View>
                    <TextInput style={styles.input} value={ciudad}
                        onChangeText={ciudad => setSearch({ ...search, ciudad })}
                        placeholder="Ciudad"
                        placeholderTextColor="#666" />
                </View>
                <View>
                    <Picker itemStyle={{ height: 120, backgroundColor: 'white', borderColor: 'black' }}
                        selectedValue={pais}
                        onValueChange={pais => setSearch({ ...search, pais })}
                    >
                        <Picker.Item label="Seleccione un País" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={animacionEntrada}
                    onPressOut={animacionSalida}
                    onPress={consultarClima}
                >
                    <Animated.View style={[styles.btnBus, estiloAnimacion]}>
                        <Text style={styles.txtBus}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: "#FFF",
        fontSize: 20,
        textAlign: "center",
    },
    btnBus: {
        marginTop: 50,
        backgroundColor: "#000",
        padding: 10,
        justifyContent: "center",
        borderRadius: 50,
    },
    txtBus: {
        color: "#FFF",
        fontWeight: 'bold',
        textTransform: "uppercase",
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 50,
    },
})

export default Formulario
