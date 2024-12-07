import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions, FlatList, Modal, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Tracker = () => {
    const navigation = useNavigation();
    const [calendar, setCalendar] = useState(false);
    const [date, setDate] = useState(null);
    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isItemComplete, setIsItemComplete] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleCalendar = () => {
        setCalendar((prev) => !prev);
    };

    const uploadImage = () => {
        if (isItemComplete) return;
    
        const options = {
            mediaType: 'photo',
            maxWidth: 1024,
            maxHeight: 1024,
            quality: 0.8,
        };
    
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.error('Image Picker Error:', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0].uri;
                setImage(selectedImage);
    
                if (date) {
                    const newItem = { date: date.toISOString(), image: selectedImage };
                    const updatedItems = [...items, newItem];
                    setItems(updatedItems);
                    setImage(null);
                    setDate(null);
                    setIsItemComplete(true);
    
                    AsyncStorage.setItem('trackerItems', JSON.stringify(updatedItems))
                        .then(() => console.log('Item saved automatically'))
                        .catch((error) => console.error('Error saving item:', error));
                }
            }
        });
    };
    
    const handleDayPress = (day) => {
        if (isItemComplete) return;
    
        const selectedDate = new Date(day.dateString);
        setDate(selectedDate);
    
        if (image) {
            const newItem = { date: selectedDate.toISOString(), image };
            const updatedItems = [...items, newItem];
            setItems(updatedItems);
            setImage(null);
            setDate(null);
            setIsItemComplete(true);
    
            AsyncStorage.setItem('trackerItems', JSON.stringify(updatedItems))
                .then(() => console.log('Item saved automatically'))
                .catch((error) => console.error('Error saving item:', error));
        }
    
        setCalendar(false);
    };

    useEffect(() => {
        if (!date && !image) {
            setIsItemComplete(false);
        }
    }, [date, image]);
    
        
    useEffect(() => {
        const loadItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('trackerItems');
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                }
            } catch (error) {
                console.error('Error loading items:', error);
            }
        };
        loadItems();
    }, []);

    const handleFormat = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    };
    
    const handleDelete = () => {
        const updatedItems = items.filter((_, index) => index !== currentIndex);
        setItems(updatedItems);
    
        AsyncStorage.setItem('trackerItems', JSON.stringify(updatedItems))
            .then(() => console.log('Item deleted successfully'))
            .catch((error) => console.error('Error deleting item:', error));
    
        setDeleteModalVisible(false);
    };    

    const openDeleteModal = () => {
        if (items.length > 0) {
            setDeleteModalVisible(true);
        }
    };    

    const renderDots = () => (
        <View style={styles.paginationContainer}>
            {items.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.paginationDot,
                        index === currentIndex && styles.paginationDotActive,
                    ]}
                />
            ))}
        </View>
    );

    return (
        <ImageBackground source={require('../assets/back/back1.png')} style={{flex: 1, transform: [{ rotate: '180deg' }]}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icons type={'home'} />
                </TouchableOpacity>

                {calendar ? (
                    <Calendar
                        style={{ width: width * 0.89, borderRadius: 12 }}
                        onDayPress={handleDayPress}
                        markedDates={{
                            [date?.toISOString().split('T')[0]]: { selected: true, selectedColor: '#e3056a' },
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#e3056a',
                            todayTextColor: '#f263a6',
                            arrowColor: '#e3056a',
                            textDayFontWeight: '500',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '500',
                        }}
                    />
                ) : (
                    <View>
                        <FlatList
                            horizontal
                            data={items}
                            renderItem={({ item }) => (
                                <View style={styles.itemContainer}>
                                {item.date && (
                                    <Text style={styles.itemDate}>
                                        {handleFormat(item.date)}
                                    </Text>
                                )}
                                {item.image && (
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.itemImage}
                                    />
                                )}
                            </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            onScroll={(e) => {
                                const contentOffsetX = e.nativeEvent.contentOffset.x;
                                const index = Math.round(contentOffsetX / width);
                                setCurrentIndex(index);
                            }}
                            pagingEnabled
                        />

                        {renderDots()}

                    </View>
                )
            }

                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.toolIcon} onPress={handleCalendar}>
                        <Icons type={'calendar'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolIcon} onPress={uploadImage}>
                        <Icons type={'camera'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolIcon} onPress={openDeleteModal}>
                        <Icons type={'delete'} />
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={isDeleteModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButtonCancel}
                                    onPress={() => setDeleteModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButtonConfirm}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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

    iconsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        bottom: height * 0.12
    },

    toolIcon: {
        width: 70,
        height: 70
    },

    itemContainer: {
        width: width * 0.87,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 99, 166, 0.7)',
        borderRadius: 10,
        marginHorizontal: 10
    },

    itemDate: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: height * 0.02,
        color: '#fff'
    },

    itemImage: {
        width: height * 0.37,
        height: height * 0.37,
        borderRadius: 10,
    },

    paginationContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.25
    },

    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#ffadd4',
        marginHorizontal: 3,
    },

    paginationDotActive: {
        backgroundColor: '#780142',
        width: 13,
        height: 13
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(66, 1, 31, 0.8)',
    },

    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    modalButtonCancel: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalButtonConfirm: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#e3056a',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalButtonText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    },
    

});

export default Tracker;