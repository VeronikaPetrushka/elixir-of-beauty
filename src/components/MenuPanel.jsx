import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const MenuPanel = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'AdvicesScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('AdvicesScreen')}>
                    <Icons type={'advice'} active={activeButton === 'AdvicesScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'PlanScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('PlanScreen')}>
                    <Icons type={'plan'} active={activeButton === 'PlanScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'TrackerScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('TrackerScreen')}>
                    <Icons type={'tracker'} active={activeButton === 'TrackerScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'GameScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('GameScreen')}>
                    <Icons type={'game'} active={activeButton === 'GameScreen'}/>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height * 0.11,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 9,
        flexDirection: 'row',
        backgroundColor: '#8c0142',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignSelf: "center",
    },
    
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 60,
        height: 60,
        padding: 12
    },
    activeButton: {
        backgroundColor: '#fcaed0',
        borderRadius: 30,
    }
});

export default MenuPanel;
