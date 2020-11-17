import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import { Button, FAB, Headline, List } from 'react-native-paper'
import globalStyles from '../styles/global'


const Inicio = ({ navigation }) => {

    const [clientes, setClientes] = useState([])
    const [consultar, setConsultar] = useState(true)

    const getData = () => setConsultar(!consultar);
    useEffect(() => {
        const getDt = async () => {
            try {
                const rs = await Axios.get('http://10.0.2.2:3000/clientes')
                setClientes(rs.data)
            } catch (error) {
                console.log(error);
            }
        }
        if (consultar) {
            getDt()
            getData()
        }
    }, [consultar])


    const showAlert = (id) => {
        Alert.alert(
            '¿Deseas eliminar el registro?',
            'El registro eliminado no se puede recuperar',
            [{ text: 'Cancelar' }, { text: 'Aceptar', onPress: () => deleteDt(id) }]
        )
    }

    const deleteDt = (id) => {
        try {
            Axios.delete(`http://10.0.2.2:3000/clientes/${id}`)
            getData()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={globalStyles.contenedor}>
                {/* <Button icon="plus-circle"
                    onPress={() => navigation.navigate('new', { getData })}
                >Nuevo Cliente</Button> */}
                <Headline style={globalStyles.titulo}>{clientes.length ? 'Clientes' : 'Aún no hay clientes'}</Headline>
                <FlatList data={clientes}
                    keyExtractor={v => v.id.toString()}
                    renderItem={({ item }) => <List.Item
                        title={item.nom}
                        description={item.emp}
                        onPress={() => navigation.navigate('details', { item, getData })}
                        left={() => <List.Icon icon="folder" />}
                        right={() =>
                            <View style={{ flexDirection: 'row', }}>
                                <FAB icon="pencil"
                                    style={{ backgroundColor: 'teal', marginRight: 10 }}
                                    onPress={() => navigation.navigate('new', { item, getData })}
                                />
                                <FAB icon="delete"
                                    style={{ backgroundColor: 'red' }}
                                    onPress={() => showAlert(item.id)}
                                />
                            </View>
                        }
                    />}
                />
                <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('new', { getData })} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})

export default Inicio
