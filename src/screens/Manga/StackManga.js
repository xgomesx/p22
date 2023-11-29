import { createStackNavigator } from '@react-navigation/stack'
import FormManga from './FormManga'
import ListaManga from './ListaManga'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaManga' 
        >
            <Stack.Screen name='ListaManga' component={ListaManga} /> 
            <Stack.Screen name='FormManga' component={FormManga} />
        </Stack.Navigator>
    )
}
