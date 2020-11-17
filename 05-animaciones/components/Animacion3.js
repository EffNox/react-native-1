import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View } from "react-native";

const Animacion3 = () => {

    const [ani] = useState(new Animated.Value(14))
    useEffect(() => {
        Animated.timing(
            ani, { toValue: 40, duration: 1000, useNativeDriver: false }
        ).start()
    }, [])
    return (
        <>
            <View>
                <Animated.Text style={[styles.txt, { fontSize: ani }]}>Animación3</Animated.Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Animacion3
