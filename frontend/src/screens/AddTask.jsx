import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import common from '../../assets/styles/common';

export default function AddTask({ isVisible, onCancel, saveTask }) {

    const [desc, setDesc] = useState('')
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePIcker] = useState(false)

    defaultState = () => {
        setDesc('')
        setDate(new Date())
    }

    onSave = () => {
        const convertedDateToPtBr = new Date(moment(date).add(-3, "hours"))
        const newTask = { desc: desc, date: convertedDateToPtBr }
        saveTask && saveTask(newTask)
        defaultState()
    }

    getDatePicker = () => {
        let datePicker =
            <DateTimePicker
                value={date}
                onChange={(_, newDate) => {
                    setDate(newDate ? newDate : date)
                    setShowDatePIcker(false)
                }}
                mode='date'
                onCancel={() => { setShowDatePIcker(false) }}
            />

        const dateString = moment(date).format('dddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => setShowDatePIcker(true)}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
            animationType='slide'
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Informe a Descri????o...'
                    value={desc}
                    onChangeText={newValue => setDesc(newValue)}
                />

                {getDatePicker()}

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSave}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: common.fontFamily,
        backgroundColor: common.colors.today,
        color: common.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: common.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        padding: 5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: common.colors.today
    },
    date: {
        fontFamily: common.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
});