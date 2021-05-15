import React from 'react'
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerItems } from 'react-navigation-drawer'
import common from '../../assets/styles/common'
import { logout } from '../libs/storage'

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
                <TouchableOpacity onPress={() => logout(props.navigation)}>
                    <View style={styles.logoutIcon}>
                        <Icon name="sign-out" size={30} color="#800" />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItems {...props} />
        </ScrollView >
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