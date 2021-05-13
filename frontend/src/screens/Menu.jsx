import React from 'react'
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import common from '../../assets/styles/common'
import { Gravatar } from 'react-native-gravatar'

export default function Menu(props) {
    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar
                    style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
                    <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: common.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222'
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: common.fontFamily,
        fontSize: 20,
        color: common.colors.mainText,
        marginBottom: 5,
    },
    email: {
        fontFamily: common.fontFamily,
        fontSize: 15,
        color: common.colors.subText,
        marginBottom: 10,
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
})