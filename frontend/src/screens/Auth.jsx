import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import backgroundImage from '../../assets/imgs/login.jpg';
import common from '../../assets/styles/common';
import AuthInput from '../components/AuthInput'
import axios from 'axios'
import { serverConfig, showError, showSuccess } from '../libs/storage'

export default function Auth(props) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("als_08.net@hotmail.com")
    const [password, setPassword] = useState("123456")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [newUser, setNewUser] = useState(false)
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if (newUser) {
            const valid =
                (
                    name && name.trim().length != 0 &&
                    email && email.trim().length != 0 && email.includes("@") &&
                    password && password.trim().length != 0 &&
                    confirmedPassword && confirmedPassword === password
                )
            setValidForm(valid)
        } else {
            const valid =
                (
                    email && email.trim().length != 0 && email.includes("@") &&
                    password && password.trim().length != 0
                )
            setValidForm(valid)
        }
    }, [name, email, password, confirmedPassword, newUser])

    defaultState = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmedPassword("")
        setNewUser(false)
    }

    signUp = async () => {
        if (!validForm) {
            showError("Formulário preenchido incorretamente")
            return
        }

        try {
            await axios.post(`${serverConfig.BASE_URL}/users/signup`, {
                name,
                email,
                password
            })

            showSuccess("Seja Bem-vindo! Faça login com os dados cadastrados")
            defaultState()
        } catch (e) {
            showError(e)
        }

    }

    signIn = async () => {
        if (!validForm) {
            showError("Formulário preenchido incorretamente")
        }

        try {
            const res = await axios.post(`${serverConfig.BASE_URL}/login`, {
                email,
                password
            })

            axios.defaults.headers.common["Authorization"] = res.headers.authorization
            showSuccess("Seja Bem-vindo!")
            props.navigation.navigate('Home')
        } catch (e) {
            showError(e)
        }

    }

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
                <TouchableOpacity
                    onPress={() => { newUser ? signUp() : signIn() }}
                    disabled={!validForm}
                >
                    <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAAAAA' }]}>
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