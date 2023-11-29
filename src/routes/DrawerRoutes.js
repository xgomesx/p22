
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackFilmes from '../screens/Filmes/StackFilmes';
import StackManga from '../screens/Manga/StackManga'
import StackSeries from '../screens/Series/StackSeries'
import StackAnime from '../screens/Anime/StackAnimes'
import StackFeedBack from '../screens/Feedback/StackFeed'
const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Alunos'>
            <Drawer.Screen name="Filmes" component={StackFilmes} />
            <Drawer.Screen name='Manga' component={StackManga}/>
            <Drawer.Screen name='Series' component={StackSeries}/>
            <Drawer.Screen name='Anime' component={StackAnime}/>
            <Drawer.Screen name='Feed' component={StackFeedBack}/>

        </Drawer.Navigator>

    )
}