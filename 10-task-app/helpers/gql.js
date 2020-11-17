import { gql } from "@apollo/client"

// QUERYS
const GET_PROYECTOS = gql`
      {
        getProyectos{
          id
          nom
          createdBy{
            nom
            cor
          }
          createdAt
          updatedAt
        }
      }
`
const GET_TAREAS = gql`
      query($proyecto: ID!) {
        getTareasByProyecto(proyecto: $proyecto) {
          id
          nom
          est
        }
      }
`

// MUTATIONS
const LOGIN = gql`
    mutation($dt:LoginInp!) {
        login(dt:$dt){
          tk
          msg
         }
       }
`
const CREATE_USER = gql`
     mutation($dt: UsuInp!) {
         createUsuario(dt: $dt) {
           nom
           cor
           pwd
         }
       }
`
const CREATE_PROYECTO = gql`
    mutation($dt: ProInp!) {
        createProyecto(dt: $dt) {
        id
        nom
        createdAt
        updatedAt
        }
    }
`
const UPDATE_PROYECTO = gql`
    mutation($id: ID!, $dt: ProInp!) {
      updateProyecto(id: $id, dt: $dt) {
        id
        nom
      }
    }
`
const DELETE_PROYECTO = gql`
    mutation($id: ID!) {
      deleteProyecto(id: $id) {
        id
        nom
        createdAt
      }
    }
`
const CREATE_TAREA = gql`
    mutation($dt: TarInp!) {
        createTarea(dt: $dt) {
        id
        nom
        est
        }
    }
`
const UPDATE_TAREA = gql`
      mutation($id: ID!, $dt: TarInp!) {
        updateTarea(id: $id, dt: $dt) {
          id
          nom
          est
        }
      }
`
const DELETE_TAREA = gql`
    mutation($id: ID!) {
      deleteTarea(id: $id) {
        id
        nom
        est
      }
    }
`

export {
  LOGIN,
  CREATE_USER,
  GET_PROYECTOS,
  CREATE_PROYECTO,
  UPDATE_PROYECTO,
  DELETE_PROYECTO,
  GET_TAREAS,
  CREATE_TAREA,
  UPDATE_TAREA,
  DELETE_TAREA,
}
