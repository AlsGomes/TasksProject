import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet, View
} from 'react-native';
import { showError } from '../libs/storage';

export default function AuthOrApp(props) {

    useEffect(() => {
        async function getUserData() {
            try {
                const userDataJSON = await AsyncStorage.getItem("@tasks:userData")                
                const userData = userDataJSON ? JSON.parse(userDataJSON) : null

                if (userData) {
                    axios.defaults.headers.common["Authorization"] = userData.token
                    props.navigation.navigate("Home", userData.data)
                } else {
                    props.navigation.navigate("Auth")
                }
            } catch (e) {
                showError(e)
                props.navigation.navigate("Auth")
            }
        }

        getUserData()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})