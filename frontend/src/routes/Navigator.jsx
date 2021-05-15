import addMonths from 'date-fns/addMonths'
import differenceInDays from 'date-fns/differenceInDays'
import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import common from '../../assets/styles/common'
import Auth from '../screens/Auth'
import AuthOrApp from '../screens/AuthOrApp'
import Menu from '../screens/Menu'
import TaskList from '../screens/TaskList'

const getTaskList = (title, daysAhead, props) => {
    return (
        <TaskList title={title} daysAhead={daysAhead} {...props} />
    )
}

const getDaysAmountForOneMonth = () => {
    const now = new Date()
    const oneMonthLater = addMonths(now, 1)
    const diff = differenceInDays(oneMonthLater, now)
    return diff
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
        screen: props => getTaskList("Semana", 7, props),
        navigationOptions: {
            title: "Semana"
        }
    },
    Month: {
        name: "Month",
        screen: props => getTaskList("Mês", getDaysAmountForOneMonth(), props),
        navigationOptions: {
            title: "Mês"
        }
    },
    All: {
        name: "All",
        screen: props => getTaskList("Todas", -1, props),
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