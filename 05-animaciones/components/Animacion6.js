import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, View } from "react-native";

const Animacion6 = () => {

    const [ani1] = useState(new Animated.Value(0))
    const [ani2] = useState(new Animated.Value(-50))

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(ani2, { toValue: -30, duration: 500, useNativeDriver: !0 }),
                Animated.timing(ani1, { toValue: 60, duration: 500, useNativeDriver: !0 }),
                Animated.timing(ani2, { toValue: 30, duration: 500, useNativeDriver: !0 }),
                Animated.timing(ani1, { toValue: 0, duration: 500, useNativeDriver: !0 }),
            ])
        ).start()
    }, [])

    const styleAni = { transform: [{ translateY: ani1 }, { translateX: ani2 }] }

    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.View style={[styles.caja, styleAni]}>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    caja: {
        width: 10,
        height: 10,
        backgroundColor: 'cornflowerblue',
    },
})

export default Animacion6
