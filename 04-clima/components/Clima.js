import React from 'react'
import { StyleSheet, View, Text, Image } from "react-native";

const Clima = ({ resultado }) => {
    const { name, main, weather } = resultado;
    if (!name) return null;

    // grados kelvin
    const kelvin = 273.15;


    return (
        <>
            <View style={styles.clima}>
                <Text style={[styles.txt, styles.actual]}>{parseInt(main.temp - kelvin)}
                    <Text style={styles.temp}>&#x2103;</Text>
                    <Image style={{ width: 120, height: 120 }} source={{ uri: `http://openweathermap.org/img/w/${weather[0].icon}.png` }} />
                </Text>
                <View style={styles.temperatura}>
                    <Text style={styles.txt}>Min {' '}
                        <Text style={styles.temp}>{parseInt(main.temp_min - kelvin)}&#x2103;</Text>
                    </Text>
                    <Text style={styles.txt}>Max {' '}
                        <Text style={styles.temp}>{parseInt(main.temp_max - kelvin)}&#x2103;</Text>
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    txt: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temperatura: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default Clima
