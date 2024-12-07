import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdviceModal from "./AdviceModal";
import advices from '../constants/advices';
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Advices = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pressed, setPressed] = useState(null);
    const [changeHeight, setChangeHeight] = useState(height * 0.52)
    const flatListRef = useRef(null);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % advices.length;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        setPressed(null);
        setChangeHeight(height * 0.52);
      };
    
      const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + advices.length) % advices.length;
        setCurrentIndex(prevIndex);
        flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
        setPressed(null);
        setChangeHeight(height * 0.52);
      };  
      
      const handleMore = () => {
        if(pressed === null){
            setPressed(advices[currentIndex]);
            setChangeHeight(height * 0.63)
        } else {
            setPressed(null);
            setChangeHeight(height * 0.52);
        }
      }

    return (
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>

                <FlatList
                    horizontal
                    data={advices}
                    renderItem={({item, index}) => (
                        <View style={{ alignItems: 'center' }}>
                            <View key={index} style={[styles.textContainer, {height: changeHeight}]}>
                                <ScrollView>
                                    <Image source={item.image} style={styles.image} />
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.tip}>{item.tip}</Text>
                                    {
                                        pressed === item && (
                                            <View style={{width: '100%'}}>
                                                <Text style={styles.tip}>{item.description}</Text>
                                                {
                                                    item.items.map((i, index) => (
                                                        <View key={index} style={{width: '100%'}}>
                                                            <Text style={styles.tip}>{i.item}</Text>
                                                            {i.option1 && <Text style={styles.option}>{i.option1}</Text>}
                                                            {i.option2 && <Text style={styles.option}>{i.option2}</Text>}
                                                            {i.option3 && <Text style={styles.option}>{i.option3}</Text>}
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    ref={flatListRef}
                    extraData={{ currentIndex }}
                />

                <View style={styles.btnsContainer}>
                    <TouchableOpacity style={[styles.arrow, { transform: [{ rotate: '180deg' }] }]} onPress={handlePrevious}>
                        <Icons type={'arrow'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreBtn} onPress={handleMore}>
                        <Text style={styles.moreBtnText}>Learn more</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrow} onPress={handleNext}>
                        <Icons type={'arrow'} />
                    </TouchableOpacity>
                </View>

                <AdviceModal visible={modalVisible} onClose={() => setModalVisible(false)} />
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

    textContainer: {
        borderRadius: 10,
        width: width * 0.87,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: height * 0.05,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,    
    },

    image: {
        width: '100%',
        height: height * 0.25,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: height * 0.03,
        alignSelf: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: '900',
        color: '#db1873',
        textAlign: 'center',
        marginBottom: height * 0.02
    },

    tip: {
        fontSize: 16,
        fontWeight: '500',
        color: '#5e012c',
        textAlign: 'justify',
        marginBottom: height * 0.015
    },

    option: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8a0040',
        textAlign: 'justify',
        marginBottom: height * 0.015
    },

    btnsContainer: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        position: 'absolute',
        bottom: height * 0.14
    },

    arrow: {
        width: 40,
        height: 40
    },

    moreBtn: {
        paddingVertical: 8,
        paddingHorizontal: 50,
        backgroundColor: '#fa7fd9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    moreBtnText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '800'
    }

});

export default Advices;