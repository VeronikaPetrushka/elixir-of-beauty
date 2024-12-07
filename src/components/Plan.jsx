import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, ScrollView, Share } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [selected, setSelected] = useState({});

    useEffect(() => {
        const loadState = async () => {
            const storedCompleted = await AsyncStorage.getItem('planCompleted');
            const storedSelected = await AsyncStorage.getItem('planSelected');
    
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
        if (currentQuestionIndex < plan.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCompleted(true);
            await AsyncStorage.setItem('planCompleted', 'true');
            await AsyncStorage.setItem('planSelected', JSON.stringify(selected));
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
            let shareMessage = "Here's what I got in my plan results:\n\n";

            let imageUrl = null;
    
            plan[0].options.forEach((option) => {
                if (selected[0] === option.option) {
                    shareMessage += `${option.description[0]}\n\n`;
                    imageUrl = Image.resolveAssetSource(option.image).uri;
                    shareMessage += `${option.description[1]}\n\n`;
                    shareMessage += `${option.description[2]}\n\n`;
                    shareMessage += "Recommendations:\n";
                    option.recommendations.forEach((recommendation) => {
                        shareMessage += `- ${recommendation}\n`;
                    });
                }
            });
    
            const shareContent = {
                message: shareMessage,
            };
    
            if (imageUrl) {
                shareContent.url = imageUrl;
            }
    
            await Share.share(shareContent);
        } catch (error) {
            console.error("Error sharing results:", error);
        }
    };
    

    const handleClearResults = async () => {
        setCompleted(false);
        setSelected({});
        setCurrentQuestionIndex(0);
        await AsyncStorage.removeItem('planCompleted');
        await AsyncStorage.removeItem('planSelected');
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
                            <Text style={[styles.question, {fontSize: 22, marginBottom: height * 0.03}]}>Look what you`ve got !</Text>
                            <View style={{width: '100%'}}>
                                {plan[0].options.map((option, index) => (
                                    selected[0] === option.option && (
                                        <View key={index} style={styles.resultsText}>
                                            <ScrollView>
                                                <Text style={styles.description}>{option.description[0]}</Text>
                                                <Image source={option.image}  style={{width: 100, height: 100, alignSelf: 'center', marginBottom: height * 0.04}} />
                                                <Text style={[styles.description, {fontWeight: '600'}]}>{option.description[1]}</Text>
                                                <Text style={[styles.description, {fontWeight: '600'}]}>{option.description[2]}</Text>
                                                <Text style={styles.subTitle}>Recommendations:</Text>
                                                <Text style={styles.recommendation}>- {option.recommendations[0]}</Text>
                                                <Text style={styles.recommendation}>- {option.recommendations[1]}</Text>
                                                <Text style={styles.recommendation}>- {option.recommendations[2]}</Text>
                                                <Text style={styles.recommendation}>- {option.recommendations[3]}</Text>
                                            </ScrollView>
                                        </View>
                                    )
                                ))}
                            </View> 
                            <TouchableOpacity style={styles.nextBtn} onPress={handleClearResults}>
                                <Text style={styles.nextBtnText}>Clear results</Text>
                            </TouchableOpacity>                      
                        </View>
                    ) : (
                        <View style={{width: '100%', height: '100%'}}>
                            {
                                plan[currentQuestionIndex] && (
                                    <View style={{width: '100%'}}>
                                        <Text style={styles.question}>{plan[currentQuestionIndex].question}</Text>
                                        {
                                            plan[currentQuestionIndex].options.map((o, index) => (
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
                                    {currentQuestionIndex < plan.length - 1 ? 'Next' : 'Finish'}
                                </Text>
                            </TouchableOpacity>
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
        bottom: height * 0.12
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

export default Plan;