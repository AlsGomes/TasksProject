import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import common from '../../assets/styles/common';
import AuthInput from '../components/AuthInput'

export default function Auth() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [newUser, setNewUser] = useState(false)

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>{newUser ? "Crie sua conta" : "Informe seus dados"}</Text>
                {newUser &&
                    <AuthInput
                        icon="user"
                        placeholder="Nome"
                        value={name}
                        onChangeText={newValue => setName(newValue)}
                        style={styles.input}
                    />
                }
                <AuthInput
                    icon="at"
                    placeholder="E-mail"
                    value={email}
                    onChangeText={newValue => setEmail(newValue)}
                    style={styles.input}
                />
                <AuthInput
                    icon="lock"
                    placeholder="Senha"
                    value={password}
                    onChangeText={newValue => setPassword(newValue)}
                    style={styles.input}
                    secureTextEntry={true}
                />
                {newUser &&
                    <AuthInput
                        icon="asterisk"
                        placeholder="Confirmação de Senha"
                        value={confirmedPassword}
                        onChangeText={newValue => setConfirmedPassword(newValue)}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                }
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{newUser ? "Cadastrar-se" : "Entrar"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => setNewUser(!newUser)}
                style={{ padding: 10 }}
            >
                <Text style={styles.buttonText}>{newUser ? "Já possui conta?" : "Não possui conta?"}</Text>
            </TouchableOpacity>
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
        backgroundColor: '#FFF',
        padding: 10
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