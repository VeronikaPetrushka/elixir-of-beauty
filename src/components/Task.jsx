import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, ScrollView, Share } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import task from '../constants/task';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Task = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        const loadState = async () => {
            const storedCompleted = await AsyncStorage.getItem('taskCompleted');
            const storedSelected = await AsyncStorage.getItem('taskSelected');
    
            if (storedCompleted === 'true') {
                setCompleted(true);
            }
    
            if (storedSelected) {
                setSelected(JSON.parse(storedSelected));
            }
        };
        loadState();
    }, []);    

    const handleNext = async () => {
        if (currentQuestionIndex < task.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
            await AsyncStorage.setItem('taskCompleted', 'true');
            await AsyncStorage.setItem('taskSelected', JSON.stringify(selected));
        }
    };
    
    const handleSelect = (option) => {
        setSelected({
            ...selected,
            [currentQuestionIndex]: option,
        });
    };

    const handleShare = async () => {
        try {
            let shareMessage = "Here's what I got for personalized routine plan:\n\n";
    
            task.forEach((question, questionIndex) => {
                question.options.forEach((option) => {
                    if (selected[questionIndex] === option.option) {
                        option.recommendations.forEach((rec) => {
                            shareMessage += `- ${rec}\n`;
                        });
                    }
                });
            });
            
            const shareContent = {
                message: shareMessage,
            };
        
            await Share.share(shareContent);
        } catch (error) {
            console.error("Error sharing results:", error);
        }
    };
    

    const handleClearResults = async () => {
        setCompleted(false);
        setSelected({});
        setCurrentQuestionIndex(0);
        await AsyncStorage.removeItem('taskCompleted');
        await AsyncStorage.removeItem('taskSelected');
    };
    
    return (
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.share} onPress={handleShare}>
                    <Icons type={'share'} />
                </TouchableOpacity>

                {
                    completed ? (
                        <View style={{width: '100%', height: '100%'}}>
                            <Text style={[styles.question, {fontSize: 22, marginBottom: height * 0.03}]}>Follow personalized routine to reach perfect skin !</Text>
                                <View style={styles.resultsText}>
                                    <ScrollView>
                                        <Text style={styles.description}>Based on your answers, we have developed a short skin care plan for you !</Text>
                                        {task.map((question, questionIndex) => (
                                            question.options.map((option, optionIndex) => (
                                                selected[questionIndex] === option.option &&
                                                option.recommendations &&
                                                option.recommendations.map((rec, recIndex) => (
                                                    <Text key={`${questionIndex}-${optionIndex}-${recIndex}`} style={styles.recommendation}>
                                                        - {rec}
                                                    </Text>
                                                ))
                                            ))
                                        ))}
                                    </ScrollView>
                                </View>
                            <TouchableOpacity style={styles.nextBtn} onPress={handleClearResults}>
                                <Text style={styles.nextBtnText}>Clear results</Text>
                            </TouchableOpacity>                      
                        </View>
                    ) : (
                        <View style={{width: '100%', height: '100%'}}>
                            {
                                task[currentQuestionIndex] && (
                                    <View style={{width: '100%'}}>
                                        <Text style={styles.question}>{task[currentQuestionIndex].question}</Text>
                                        {
                                            task[currentQuestionIndex].options.map((o, index) => (
                                                <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => handleSelect(o.option)}>
                                                    <View style={styles.checkbox}>
                                                    <View
                                                        style={selected[currentQuestionIndex] === o.option ? styles.checked : null}
                                                    />
                                                    </View>
                                                    <Text style={styles.optionText}>{o.option}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                )
                            }
                            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                                <Text style={styles.nextBtnText}>
                                    {currentQuestionIndex < task.length - 1 ? 'Next' : 'Finish'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

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

    share: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.055,
        right: 20
    },

    question: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: height * 0.1
    },

    optionContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: height * 0.03,
        backgroundColor: '#ff5ca8',
        padding: 5,
        borderRadius: 10,
    },

    checkbox: {
        width: 25,
        height: 25,
        marginRight: 20,
        borderWidth: 3,
        borderColor: '#75093b',
        borderRadius: 30,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    checked: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: '#75093b',
        borderColor: '#75093b'
    },

    optionText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
        width: '85%'
    },

    nextBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#75093b',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        bottom: height * 0.08
    },

    nextBtnText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '900',
    },

    resultsText: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        height: height * 0.54
    },

    description: {
        fontSize: 16,
        color: '#75093b',
        fontWeight: '400',
        textAlign: 'justify',
        marginBottom: height * 0.02
    },

    subTitle: {
        fontSize: 18,
        color: '#fc0376',
        fontWeight: '800',
        marginBottom: height * 0.02
    },

    recommendation: {
        fontSize: 16,
        color: '#ff59a5',
        fontWeight: '500',
        textAlign: 'justify',
        marginBottom: height * 0.01
    }
});

export default Task;