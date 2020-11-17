import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View, TouchableWithoutFeedback } from "react-native";

const Animacion5 = () => {

    const [ani] = useState(new Animated.Value(1))

    const presionarBtn = () => Animated.spring(ani, { toValue: .8, useNativeDriver: !0 }).start()

    const soltarBtn = () => Animated.spring(ani, { toValue: 1, friction: .1, tension: .1, useNativeDriver: !0 }).start()

    const styleAni = { transform: [{ scale: ani }] }

    return (
        <View style={styles.contenedor}>
            <TouchableWithoutFeedback onPressIn={presionarBtn} onPressOut={soltarBtn}>
                <Animated.View style={[styles.btn, styleAni]}>
                    <Text style={styles.txt}>LogIn</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'cornflowerblue',
        width: 200,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 28
    },
})

export default Animacion5
