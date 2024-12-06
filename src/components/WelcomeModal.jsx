import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native"
import Icons from './Icons';

const WelcomeModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={[styles.modalText, {color: '#f531c1', fontWeight: '700'}]}>Welcome to the world of care and beauty!</Text>
                <View style={{width: 80, height: 80, marginVertical: 20}}>
                    <Icons type={'cream'} />
                </View>
                <Text style={styles.modalText}>This app will help you understand your skin's needs and create a personalized care plan. Get useful tips, learn interesting facts and track your progress.
                    Take the first step to healthy and glowing skin right now!
                </Text>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeBtnText}>Start your journey !</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(66, 1, 31, 0.8)',
    },

    modalContent: {
        width: '80%',
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

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },

    closeBtn: {
        padding: 8,
        width: '100%',
        backgroundColor: '#fc86bd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    closeBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
    }
})


export default WelcomeModal;