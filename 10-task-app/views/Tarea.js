import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Button, Container, Content, Form, H2, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Switch, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import TareaItem from '../components/TareaItem'
import { GET_TAREAS, CREATE_TAREA, UPDATE_TAREA, DELETE_TAREA, } from '../helpers/gql'
import { gbStyle, showAlert } from '../styles/global'

const Tarea = ({ route: { params }, }) => {

    const [nom, setNom] = useState()
    const [id, setId] = useState()


    const [rsCreate, { loading: loadingCreate }] = useMutation(CREATE_TAREA, {
        update(cache, { data: { createTarea } }) {
            const { getTareasByProyecto } = cache.readQuery({ query: GET_TAREAS, variables: { proyecto: params.id } })
            cache.writeQuery({ query: GET_TAREAS, variables: { proyecto: params.id }, data: { getTareasByProyecto: [...getTareasByProyecto, createTarea] } })
        }
    })
    const [rsUpdate, { loading: loadingUpdate }] = useMutation(UPDATE_TAREA)
    const create = async () => {
        clear()
        try {
            if (id) {
                await rsUpdate({ variables: { id, dt: { nom } } })
                return showAlert('Actualización actualizada 😎')
            }
            await rsCreate({ variables: { dt: { nom, proyecto: params.id } } })
            return showAlert('Registro registrado 😎')
        } catch (err) {
            showAlert(err.message)
        }
    }

    const [rsDelete, { loading: loadingDelete }] = useMutation(DELETE_TAREA, {
        async update(cache, { data }) {
            const { getTareasByProyecto } = await cache.readQuery({ query: GET_TAREAS, variables: { proyecto: params.id, } })
            await cache.writeQuery({ query: GET_TAREAS, variables: { proyecto: params.id }, data: { getTareasByProyecto: getTareasByProyecto.filter(v => v.id !== data?.deleteTarea?.id) } })
        }
    })
    const delet = async id => await rsDelete({ variables: { id } })


    const [rsData, { loading: loadingData, data }] = useLazyQuery(GET_TAREAS, { variables: { proyecto: params.id } })
    useEffect(rsData, [])

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
                {!!nom && (
                    <Button rounded block style={gbStyle.btn} onPress={create}>
                        <Text style={gbStyle.btnTxt}>{!id ? 'Registrar registro' : 'Actualiar actualización'}</Text>
                    </Button>
                )}
                <Content>
                    <List>
                        {data?.getTareasByProyecto.map(tarea => <TareaItem key={tarea.id} tarea={tarea} proyecto={params.id} delet={delet} select={select} />)}
                    </List>
                </Content>

            </View>
        </Container>
    )
}

export default Tarea
