import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native"
import Icons from './Icons';

const GameModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={[styles.modalText, {color: '#f531c1', fontWeight: '700'}]}>Royal quiz</Text>
                <View style={{width: 80, height: 80, marginVertical: 20}}>
                    <Icons type={'crown-pink'} />
                </View>
                <Text style={styles.modalText}>You need to correctly match each queen with her beauty secret. To do this, choose the correct answer from the proposed options.</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Icons type={'start'} />
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

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },

    closeBtn: {
        width: 200,
        height: 100,
    },

})


export default GameModal;