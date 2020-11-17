import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import { Root } from 'native-base';
import Proyecto from './views/Proyecto';
import Tarea from './views/Tarea';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Root>
        <Stack.Navigator initialRouteName="login" screenOptions={hdStyle}>
          <Stack.Screen name="login" component={Login} options={{ title: 'Iniciar sesión', headerShown: !1 }} />
          <Stack.Screen name="new" component={CrearCuenta} options={{ title: 'Crear cuenta' }} />
          <Stack.Screen name="project" component={Proyecto} options={{ title: 'Proyectos' }} />
          <Stack.Screen name="tasks" component={Tarea} options={({ route: { params } }) => ({ title: params.nom })} />
        </Stack.Navigator>
      </Root>
    </NavigationContainer>
  );
};

const hdStyle = {
  headerStyle: { backgroundColor: '#444' },
  headerTintColor: 'white', headerTitleAlign: 'center',
  headerTitleStyle: { fontWeight: 'bold' }
}
const styles = StyleSheet.create({

});

export default App;
