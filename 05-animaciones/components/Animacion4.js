import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View } from "react-native";

const Animacion3 = () => {

    const [ani] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.timing(
            ani, { toValue: 360, duration: 1000, useNativeDriver: !1 }
        ).start()
    }, [])
    const interpolacion = ani.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] })
    const styleAni = {
        transform: [{ rotate: interpolacion }]
    }
    return (
        <View>
            <Animated.View style={[styles.txt, styleAni]}></Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue'
    }
})

export default Animacion3
