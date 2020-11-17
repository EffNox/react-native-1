import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated } from "react-native";

const Animacion1 = () => {

    const [ani, setAni] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.timing(
            ani, { toValue: 1, duration: 1000, useNativeDriver: true }
        ).start()
    }, [])

    return (
        <>
            <Animated.View style={{ opacity: ani }}>
                <Text style={styles.txt}>Animación1</Text>
            </Animated.View>
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

export default Animacion1
