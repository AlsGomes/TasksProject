import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-BR')

export const logout = async (navigation) => {
    delete axios.defaults.headers.common["Authorization"]
    await AsyncStorage.removeItem("@tasks:userData")
    navigation.navigate("AuthOrApp")
}

export async function loadTasks(daysAhead) {
    try {
        const maxDate = moment().endOf("day").add(daysAhead + 1, "day").format("YYYY-MM-DD")
        let res = null
        if (daysAhead != -1) {
            res = await axios.get(`${serverConfig.BASE_URL}/tasks/date?date=${maxDate}`)
        } else {
            res = await axios.get(`${serverConfig.BASE_URL}/tasks`)
        }
        
        return res.data
    } catch (err) {
        showError(err)
    }
}

export async function saveTask(newTask) {
    try {
        const res = await axios.post(`${serverConfig.BASE_URL}/tasks`, newTask)
    } catch (e) {
        showError(e)
    }
}

export async function excludeTask(taskId) {
    try {
        await axios.delete(`${serverConfig.BASE_URL}/tasks/${taskId}`)
    } catch (e) {
        showError(e)
    }
}

export async function updateTask(task) {
    try {
        await axios.put(`${serverConfig.BASE_URL}/tasks`, task)
    } catch (e) {
        showError(e)
    }
}

export async function setShowDoneTasksState(state) {
    await AsyncStorage.setItem('@tasks:showDoneTasksState', JSON.stringify(state === true ? 'true' : 'false'))
}

export async function getShowDoneTasksState() {
    let data = await AsyncStorage.getItem('@tasks:showDoneTasksState')
    data = JSON.parse(data)
    return data === 'true' ? true : false
}

export const serverConfig = {
    BASE_URL: "http://10.0.0.106:8080"
}

export function showError(err) {
    if (err.response.data.errors) {
        const errors = err.response.data.errors
        const messages = errors.map(e => e.message)
        const allMessages = messages.join("\n")
        Alert.alert("Ops! Ocorreu um problema", `${allMessages}`)
    } else if (err.response.data.path) {
        if (err.response.data.path === "/login" && err.response.data.status === 401) {
            Alert.alert("Ops! Ocorreu um problema", `Usuário ou senha inválidos`)
        } else {
            Alert.alert("Ops! Ocorreu um problema", `${err}`)
        }
    } else {
        Alert.alert("Ops! Ocorreu um problema", `${err}`)
    }
}

export function showSuccess(msg) {
    Alert.alert("Sucesso!", msg)
}