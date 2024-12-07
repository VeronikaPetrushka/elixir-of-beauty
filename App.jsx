import React,
{ useState, useEffect, useRef } 
from 'react';
// import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';

import HomeScreen from './src/screens/HomeScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import AdvicesScreen from './src/screens/AdvicesScreen';
import PlanScreen from './src/screens/PlanScreen';

import WelcomeModal from './src/components/WelcomeModal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    // const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    // const [prog, setProg] = useState(0);
  
    // const firstImageAnim = useRef(new Animated.Value(0)).current;
    // const loaderImageAnim = useRef(new Animated.Value(0)).current;

    // const firstLoaderImage = require('./src/assets/newDiz/loader1.jpg');
    // const loaderImage = require('./src/assets/newDiz/loader2.jpg');

    // useEffect(() => {
    //     Animated.timing(firstImageAnim, {
    //         toValue: 1,
    //         duration: 1500,
    //         useNativeDriver: true,
    //     }).start(() => {
    //             Animated.timing(loaderImageAnim, {
    //                 toValue: 1,
    //                 duration: 2000,
    //                 useNativeDriver: true,
    //             }).start(() => {
    //                     setLoaderIsEnded(true);
    //             });
    //     });
    // }, []);

    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);

    const handleWelcomeVisible = () => {
        setWelcomeModalVisible(!welcomeModalVisible);
    };
  
    return (
        <MusicProvider>
            <MusicPlayer />
                <NavigationContainer>
                {/* {
                    !loaderIsEnded ? (
                        <View style={{ flex: 1 }}>
                            <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                    <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                        <ImageBackground source={firstLoaderImage} style={styles.image} />
                                    </Animated.View>

                                    <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                        <ImageBackground source={loaderImage} style={styles.image} />
                                    </Animated.View>
                                    
                                </View>
                            </ImageBackground>
                        </View>
                    ) : ( */}
                        <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeVisible}/>
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
                        </Stack.Navigator>
                        {/* )
                    } */}
                </NavigationContainer>
        </MusicProvider>
    );
};

// const styles = StyleSheet.create({
//     imageContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });


export default App;
