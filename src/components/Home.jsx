import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SettingsModal from './SettingsModal';
import UserProfile from './UserProfile';
import Icons from './Icons';
import article from '../constants/articles';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
    const [userName, setUserName] = useState('');  

    const loadAvatar = async () => {
        try {
          const storedImageUri = await AsyncStorage.getItem('uploadedImage');
            
          if (storedImageUri) {
            setUploadedImage(({ uri: storedImageUri }));
        } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      };
    
      const loadName = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userProfile');
          setUserName(storedName || '');
        } catch (error) {
          console.error('Error loading name:', error);
        }
      };
    
      useFocusEffect(
        useCallback(() => {
            loadAvatar();
            loadName();
        }, [])
    );

    const handleSettingsVisible = async () => {
        setSettingsModalVisible(!settingsModalVisible);
        setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        await loadAvatar();
    }

      const closeUserProfileModal = async () => {
        setUserProfileModalVisible(false);
        await loadAvatar();
        await loadName();
    };

    return(
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
        <View style={styles.container}>

            <TouchableOpacity style={styles.userContainer} onPress={() => setUserProfileModalVisible(true)}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={uploadedImage} 
                        style={styles.avatarImage}
                    />
                </View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>Hi, {userName || "User"}</Text>
                    </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsVisible}>
                <Icons type={'settings'} />
            </TouchableOpacity>

            <View style={{width: '100%', marginTop: height * 0.12}}>
                <ScrollView contentContainerStyle={styles.articlesContainer}>
                    {
                    article.map((article, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.articleCard}
                            onPress={() => navigation.navigate('ArticleScreen', {article: article})}
                            >
                            <Image source={article.image} style={styles.articleImage} />
                            <Text style={styles.articleTitle} numberOfLines={2} ellipsizeMode="tail">{article.title}</Text>
                        </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>

            <SettingsModal visible={settingsModalVisible} onClose={handleSettingsVisible} />
            <UserProfile visible={userProfileModalVisible} onClose={closeUserProfileModal}/>
        </View>
        </ImageBackground>
    )
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

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 171, 212, 0.9)',
        zIndex: 10,
        position: 'absolute',
        top: height * 0.07,
        left: 20
    },

    imageContainer: {
        padding: 0,
        width: height * 0.06,
        height: height * 0.06,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: 10
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    nameBox: {
        padding: 5, 
        borderRadius: 50, 
        backgroundColor: '#f9f9f9', 
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 7,
    },

    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#61495c',
        textAlign: 'center'
    },

    settingsIcon: {
        position: 'absolute',
        top: height * 0.07,
        right: 20,
        width: 55,
        height: 55
    },

    image: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'cover',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: height * 0.05
    },

    title: {
        fontSize: 23,
        fontWeight: '700',
        color: '#FDF3E7',
        lineHeight: 23,
        textAlign: 'center',
        marginBottom: height * 0.02
    },

    articlesContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    articleCard: {
        width: '47%',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 171, 212, 0.9)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height * 0.3,
        marginBottom: 10
    },

    articleImage: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
        borderRadius: 10
    },

    articleTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 21,
        overflow: 'hidden',
      },

});

export default Home;