import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';

import HomeScreen from './src/screens/HomeScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import AdvicesScreen from './src/screens/AdvicesScreen';
import PlanScreen from './src/screens/PlanScreen';
import TrackerScreen from './src/screens/TrackerScreen';
import TaskScreen from './src/screens/TaskScreen';
import GameScreen from './src/screens/GameScreen';

import WelcomeModal from './src/components/WelcomeModal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleWelcomeVisible = () => {
        setModalVisible(!modalVisible);
    };
  
    return (
        <MusicProvider>
            <MusicPlayer />
                <NavigationContainer>
                    <WelcomeModal visible={modalVisible} onClose={handleWelcomeVisible}/>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ArticleScreen" 
                            component={ArticleScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="AdvicesScreen" 
                            component={AdvicesScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="PlanScreen" 
                            component={PlanScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TrackerScreen" 
                            component={TrackerScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="TaskScreen" 
                            component={TaskScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="GameScreen" 
                            component={GameScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
                </NavigationContainer>
        </MusicProvider>
    );
};

export default App;
