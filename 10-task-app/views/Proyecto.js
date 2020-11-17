import { useLazyQuery, useMutation } from '@apollo/client'
import { Button, Container, Content, Form, H2, Input, Item, Left, List, ListItem, Right, Spinner, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { CREATE_PROYECTO, GET_PROYECTOS, UPDATE_PROYECTO, DELETE_PROYECTO } from '../helpers/gql'
import { showAlert, gbStyle } from '../styles/global'

const Proyecto = ({ navigation }) => {

    const [nom, setNom] = useState()
    const [id, setId] = useState()

    const [rsCreateProyecto, { loading: loadingCreate }] = useMutation(CREATE_PROYECTO, {
        update(cache, { data: { createProyecto } }) {
            const { getProyectos } = cache.readQuery({ query: GET_PROYECTOS })
            cache.writeQuery({ query: GET_PROYECTOS, data: { getProyectos: getProyectos.concat([createProyecto]) } })
        }
    })
    const [updateProyecto, { loading: loadingUpdate }] = useMutation(UPDATE_PROYECTO)
    const create = async () => {
        clear()
        try {
            if (id) {
                await updateProyecto({ variables: { id, dt: { nom } } })
                return showAlert('Actualización actualizada 😎')
            }
            await rsCreateProyecto({ variables: { dt: { nom } } })
            return showAlert('Registro registrado 😎')
        } catch (err) {
            showAlert(err.message)
        }
    }

    const [deleteProyecto, { loading: loadingDelete }] = useMutation(DELETE_PROYECTO, {
        update(cache, { data: { deleteProyecto } }) {
            const { getProyectos } = cache.readQuery({ query: GET_PROYECTOS })
            cache.writeQuery({ query: GET_PROYECTOS, data: { getProyectos: getProyectos.filter(v => v.id !== deleteProyecto.id) } })
        }
    })
    const delet = async id => await deleteProyecto({ variables: { id } })


    // const { loading, data, error } = useQuery(GET_PROYECTOS)
    // const [rsProyectos, { loading: loadingData, data }] = useLazyQuery(GET_PROYECTOS, { fetchPolicy: 'cache-and-network' })
    const [rsProyectos, { loading: loadingData, data }] = useLazyQuery(GET_PROYECTOS)
    // useEffect(rsProyectos, [loadingData, loadingCreate, loadingUpdate])
    useEffect(rsProyectos, [])

    const select = (id, nom) => {
        setId(id)
        setNom(nom)
    }

    const clear = () => {
        setId(null)
        setNom(null)
    }

    return (
        <Container style={gbStyle.container}>
            <View style={gbStyle.contenidoProyecto}>
                <Form>
                    <Item inlineLabel last rounded style={gbStyle.input}>
                        <Input style={{ color: 'white' }} onChangeText={setNom} value={nom} placeholder="Título" autoFocus />
                        {!!id && <Button rounded style={gbStyle.btnClear} onPress={clear}><Text style={gbStyle.btnTxt}>X</Text></Button>}
                    </Item>
                </Form>
                {loadingData || loadingCreate || loadingUpdate || loadingDelete && <Spinner color="white" />}
                {/* {loadingCreate || loadingData || loadingUpdate && <Spinner color="white"
                    style={{ scaleX: 2.0, scaleY: 2.0, backgroundColor: 'transparent' }} />} */}
                {!!nom && (
                    <Button rounded block style={gbStyle.btn} onPress={create}>
                        <Text style={gbStyle.btnTxt}>{!id ? 'Crear Proyecto' : 'Actualiar Proyecto'}</Text>
                    </Button>
                )}
                <Content>
                    <List>
                        {data?.getProyectos.map(({ id, nom, createdAt, updatedAt }) => (
                            <ListItem key={id} onPress={() => select(id, nom)} onLongPress={() => delet(id)} >
                                <Left><Text style={{ color: 'white' }}>{nom}</Text></Left>
                                <Right>
                                    <Button rounded block style={{ backgroundColor: '#444' }} onPress={() => navigation.push('tasks', { id, nom })}>
                                        <Text style={gbStyle.btnTxt}>Tareas</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>

            </View>
        </Container>
    )
}

export default Proyecto
