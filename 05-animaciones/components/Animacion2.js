import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View } from "react-native";

const Animacion2 = () => {

    const [ani] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.timing(
            ani, { toValue: 450, duration: 1000, useNativeDriver: false }
        ).start()
    }, [])

    const vani = { width: ani, height: ani }
    return (
        < Animated.View style={[styles.caja, vani]} >
        </ Animated.View>
    )
}

const styles = StyleSheet.create({
    caja: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue'
    }
})

export default Animacion2
