import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import common from '../../assets/styles/common';

export default function Auth() {
    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: common.fontFamily,
        color: common.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: common.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: common.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
});