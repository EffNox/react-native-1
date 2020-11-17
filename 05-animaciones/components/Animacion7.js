import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View } from "react-native";

const Animacion7 = () => {

    const [ani1] = useState(new Animated.Value(0))
    const [ani2] = useState(new Animated.Value(1))

    useEffect(() => {
        Animated.sequence([
            Animated.timing(ani1, { toValue: 300, duration: 1000, useNativeDriver: !0 }),
            Animated.spring(ani2, { toValue: 10, useNativeDriver: !0 }),
            Animated.spring(ani2, { toValue: 1, useNativeDriver: !0 }),
            Animated.timing(ani1, { toValue: 600, duration: 1000, useNativeDriver: !0 }),
        ]).start()
    }, [])

    const styleAni = { transform: [{ translateY: ani1 }, { scale: ani2 }] }

    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.View style={[styles.caja, styleAni]}>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    caja: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue',
    },
})

export default Animacion7
