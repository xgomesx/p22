import { createStackNavigator } from '@react-navigation/stack'
import FormSeries from './FormSeries'
import ListaSeries from './ListaSeries'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaSeries'
        >

            <Stack.Screen name='ListaSeries' component={ListaSeries} />

            <Stack.Screen name='FormSeries' component={FormSeries} />

        </Stack.Navigator>

    )
}
