import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import common from '../../assets/styles/common'
import Auth from '../screens/Auth'
import Menu from '../screens/Menu'
import TaskList from '../screens/TaskList'
import AuthOrApp from '../screens/AuthOrApp'

const getTaskList = (title, daysAhead, props) => {    
    return (
        <TaskList title={title} daysAhead={daysAhead} {...props} />
    )
}

const menuConfig = {
    initialRouteName: "Today",
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: common.fontFamily,
            fontWeight: "normal",
            fontSize: 20
        },
        activeLabelStyle: {
            color: "#080",
            fontWeight: "bold"
        }
    }
}

const menuRoutes = {
    Today: {
        name: "Today",
        screen: props => getTaskList("Hoje", 0, props),
        navigationOptions: {
            title: "Hoje"
        }
    },
    Tomorrow: {
        name: "Tomorrow",
        screen: props => getTaskList("Amanhã", 1, props),
        navigationOptions: {
            title: "Amanhã"
        }
    },
    Week: {
        name: "Week",
        screen: props => <TaskList title="Semana" daysAhead={7} {...props} />,
        navigationOptions: {
            title: "Semana"
        }
    },
    Month: {
        name: "Month",
        screen: props => <TaskList title="Mês" daysAhead={30} {...props} />,
        navigationOptions: {
            title: "Mês"
        }
    },
    All: {
        name: "All",
        screen: props => <TaskList title="Todas" daysAhead={-1} {...props} />,
        navigationOptions: {
            title: "Todas"
        }
    }
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
    AuthOrApp: {
        name: "AuthOrApp",
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, { initialRouteName: "AuthOrApp" })
export default createAppContainer(mainNavigator)