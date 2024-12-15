import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import GameModal from './GameModal';
import game from '../constants/game';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Game = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [gameModalVisible, setGameModalVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const currentGame = game[currentIndex];
    const randomOptions = () => {
        const options = game[game.length - 1].options.filter(
            (option) => option !== currentGame.correctImage
        );
        const shuffled = options.sort(() => 0.5 - Math.random()).slice(0, 2);
        return [...shuffled, currentGame.correctImage].sort(() => 0.5 - Math.random());
    };

    const [choices, setChoices] = useState(randomOptions());

    const handleAnswer = (selected) => {
        setSelectedAnswer(selected);
        if (selected === currentGame.correctImage) {
            setTimeout(() => setModalVisible(true), 1000)
        } else {
            setTimeout(() => moveToNextQuestion(), 1000)
        }
    };

    const moveToNextQuestion = () => {
        setSelectedAnswer(null);
        setModalVisible(false);
        if (currentIndex < game.length - 2) {
            setCurrentIndex(currentIndex + 1);
            setChoices(randomOptions());
        } else {
            setQuizCompleted(true);
        }
    };

    const handleTryAgain = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setQuizCompleted(false);
        setChoices(randomOptions());
    };

    return (
        <ImageBackground source={require('../assets/back/back2.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>
                {quizCompleted ? (
                    <View style={styles.completedContainer}>
                        <TouchableOpacity style={styles.finishIcon}>
                            <Icons type={'finish'} />
                        </TouchableOpacity>
                        <Text style={[styles.completedText, {marginBottom: height * 0.02}]}>Congratulations!</Text>
                        <Text style={[styles.completedText, {marginBottom: height * 0.005, fontSize: 19, fontWeight: '800'}]}>You completed the quiz</Text>
                        <Text style={[styles.completedText, {fontSize: 19, fontWeight: '800'}]}>Try again to find out more beauty secrets of Royals` !</Text>
                        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
                            <Icons type={'play'} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>

                        <View style={styles.mainContainer}>
                            <Image source={currentGame.mainImage} style={styles.mainImage} />
                            <Text style={styles.mainText}>{currentGame.main}</Text>
                        </View>

                        <View style={styles.optionsContainer}>
                            {choices.map((choice, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleAnswer(choice)}
                                    disabled={!!selectedAnswer}
                                >
                                    <Image source={choice} style={styles.optionImage} />
                                    {selectedAnswer === choice && (
                                    <View
                                        style={[
                                            styles.overlay,
                                            choice === currentGame.correctImage
                                                ? styles.correctOverlay
                                                : styles.wrongOverlay,
                                        ]}
                                    />
                                )}
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.factText}>{currentGame.fact}</Text>
                                    <TouchableOpacity style={styles.nextButton} onPress={moveToNextQuestion}>
                                        <Text style={styles.nextButtonText}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}

                <GameModal visible={gameModalVisible} onClose={() => setGameModalVisible(false)} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.12,
        transform: [{ rotate: '180deg' }]
    },
    home: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: height * 0.055,
        left: 20
    },
    mainContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    mainImage: {
        width: width * 0.5,
        height: height * 0.4,
        resizeMode: 'cover',
        borderRadius: 10
    },
    mainText: {
        fontSize: 22,
        fontWeight: '800',
        marginTop: height * 0.01,
        color: '#fff'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    option: {
        width: '31%',
        height: width * 0.18,
        borderRadius: 10,
        overflow: 'hidden',
    },
    optionImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
    },
    
    correctOverlay: {
        backgroundColor: 'rgba(28, 150, 12, 0.6)',
    },
    
    wrongOverlay: {
        backgroundColor: 'rgba(199, 8, 8, 0.7)',
    },
    completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishIcon: {
        width: 200,
        height: 200,
        marginTop: height * 0.07
    },
    completedText: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: height * 0.04,
        textAlign: 'center',
        color: '#fff'
    },
    tryAgainButton: {
        width: 200,
        height: 200,
        marginRight: -30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(66, 1, 31, 0.8)',
    },
    modalContent: {
        width: '89%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    factText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },
    nextButton: {
        padding: 8,
        width: '100%',
        backgroundColor: '#fc86bd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
    }
});

export default Game;
