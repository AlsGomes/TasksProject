import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import monthImage from '../../assets/imgs/month.jpg';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import common from '../../assets/styles/common';
import Task from '../components/Task';
import {
    excludeTask,
    saveTask,
    updateTask
} from '../libs/storage';
import { alterShowDoneTasks, fetchShowDoneTasks, fetchTasks } from '../store/actions/tasksAction';
import AddTask from './AddTask';

function TaskList(props) {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM');

    const [visibleTasks, setVisibleTasks] = useState([])
    const [icon, setIcon] = useState('eye');
    const [showAddTask, setShowAddTask] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const focusListener = props.navigation.addListener('didFocus', () => {
            props.onFetchTasks(props.daysAhead);
        });

        props.onFetchTasks(props.daysAhead);
        props.onFetchShowDoneTasks();

        return () => {
            focusListener.remove();
        }
    }, [])

    useEffect(() => {
        setIcon(props.showDoneTasks ? 'eye' : 'eye-slash')
        setVisibleTasks(props.showDoneTasks ? props.tasks : props.tasks.filter(t => t.doneAt == null))
    }, [props.showDoneTasks])

    useEffect(() => {
        setVisibleTasks(props.showDoneTasks ? props.tasks : props.tasks.filter(t => t.doneAt == null))
    }, [props.tasks])

    toggleTask = async (id, doneAt) => {
        const task = { id, doneAt: (doneAt ? null : new Date(moment().add(-3, "hours"))) }
        await updateTask(task)
        props.onFetchTasks(props.daysAhead)
    }

    deleteTask = async taskId => {
        if (!taskId) return
        await excludeTask(taskId)
        props.onFetchTasks(props.daysAhead)
    }

    addTask = async ({ desc, date }) => {
        const validTask = desc && date && desc.trim().length != 0

        if (!validTask) {
            Alert.alert('Ops!', 'Você precisa preencher a descrição e informar uma data válida')
            return false
        }

        const newTask = {
            description: desc,
            estimateAt: date
        }

        await saveTask(newTask)
        props.onFetchTasks(props.daysAhead)
        setShowAddTask(false)
    }

    getImage = () => {
        switch (props.title) {
            case "Hoje": return todayImage
            case "Amanhã": return tomorrowImage
            case "Semana": return weekImage
            case "Mês": return monthImage
            case "Todas": return monthImage
        }
    }

    getColor = () => {
        switch (props.title) {
            case "Hoje": return common.colors.today
            case "Amanhã": return common.colors.tomorrow
            case "Semana": return common.colors.week
            case "Mês": return common.colors.month
            case "Todas": return common.colors.month
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        props.onFetchTasks(props.daysAhead)
        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <AddTask
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                saveTask={addTask}
            />

            <ImageBackground source={getImage()} style={styles.background}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Icon name="bars" size={20} color={common.colors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onAlterShowDoneTasks(!props.showDoneTasks)}>
                        <Icon name={icon} size={20} color={common.colors.secondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBar}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={styles.taskList} >
                <FlatList
                    data={visibleTasks}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Task
                            task={item}
                            toggleTask={toggleTask}
                            onDelete={deleteTask}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>

            <TouchableOpacity
                style={[styles.addButton, { backgroundColor: getColor() }]}
                onPress={() => setShowAddTask(true)}
                activeOpacity={0.7}
            >
                <Icon name='plus' size={20} color={common.colors.secondary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: common.fontFamily,
        color: common.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: common.fontFamily,
        color: common.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 50
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchTasks: daysAhead => dispatch(fetchTasks(daysAhead)),
        onAlterShowDoneTasks: show => dispatch(alterShowDoneTasks(show)),
        onFetchShowDoneTasks: () => dispatch(fetchShowDoneTasks())
    }
}

const mapStateToProps = (props) => {
    return {
        tasks: props.tasksReducer.tasks,
        showDoneTasks: props.tasksReducer.showDoneTasks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)