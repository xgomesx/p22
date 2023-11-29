import { createStackNavigator } from '@react-navigation/stack'
import FormFilmes from './FormFilmes'
import ListaFilmes from './ListaFilmes'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaFilmes' 
        >
            <Stack.Screen name='ListaFilmes' component={ListaFilmes} /> 
            <Stack.Screen name='FormFilmes' component={FormFilmes} />
        </Stack.Navigator>
    )
}
