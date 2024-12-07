import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import plan from '../constants/plan';
import PlanModal from "./PlanModal";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Plan = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleNext = () => {
        if (currentQuestionIndex < plan.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
        }
    };    

    return (
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>

                {
                    completed ? (
                        <View>
                            <Text>Completed</Text>
                        </View>
                    ) : (
                        <View style={{width: '100%'}}>
                            {
                                plan[currentQuestionIndex] && (
                                    <View style={{width: '100%'}}>
                                        <Text>{plan[currentQuestionIndex].question}</Text>
                                        {
                                            plan[currentQuestionIndex].options.map((o, index) => (
                                                <View key={index} style={styles.optionContainer}>
                                                    <TouchableOpacity style={styles.checkbox}>
                                                        <View style={styles.checked} />
                                                    </TouchableOpacity>
                                                    <Text style={styles.optionText}>{o.option}</Text>
                                                </View>
                                            ))
                                        }
                                        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                                            <Text style={styles.nextBtnText}>
                                                {currentQuestionIndex < plan.length - 1 ? 'Next' : 'Finish'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                    )
                }

                <PlanModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15,
        paddingTop: height * 0.15,
        transform: [{ rotate: '180deg' }]
    },

    home: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.055,
        left: 20
    },
});

export default Plan;