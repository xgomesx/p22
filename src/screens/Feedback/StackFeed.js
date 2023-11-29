import { createStackNavigator } from '@react-navigation/stack'
import FormFeed from './FormFeed'
import ListaFeed from './ListaFeed'

const Stack = createStackNavigator()

export default function StackFeedBack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Listafeed' 
        >
            <Stack.Screen name='ListaFeed' component={ListaFeed} /> 
            <Stack.Screen name="FormFeed" component={FormFeed} />
        </Stack.Navigator>
    )
}
