import { useMutation } from '@apollo/client'
import { Icon, Left, ListItem, Right, Switch, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { UPDATE_TAREA } from '../helpers/gql'

const TareaItem = ({ tarea: { id, nom, est }, select, delet }) => {

    const [rsUpdateEst] = useMutation(UPDATE_TAREA, { variables: { id, dt: { est: !est } } })
    return (
        <ListItem onPress={() => select(id, nom)} onLongPress={() => delet(id)} >
            <Left><Text style={{ color: 'white' }}>{nom}</Text></Left>
            <Right>
                {/* {<Icon name="ios-checkmark-circle" onPress={rsUpdateEst} style={est ? styles.enable : styles.disable} />} */}
                <Switch value={est} thumbColor="white" onValueChange={rsUpdateEst} />
            </Right>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    enable: {
        fontSize: 45,
        color: 'green'
    },
    disable: {
        fontSize: 45,
        color: '#555'
    },
})

export default TareaItem
