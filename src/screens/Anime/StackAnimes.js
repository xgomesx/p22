import { createStackNavigator } from '@react-navigation/stack'
import FormAnimes from './FormAnimes'
import ListaAnimes from './ListaAnimes'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAnimes' 
        >
            <Stack.Screen name='ListaAnimes' component={ListaAnimes} /> 
            <Stack.Screen name='FormAnimes' component={FormAnimes} />
        </Stack.Navigator>
    )
}
