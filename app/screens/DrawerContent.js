import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme =()=>{
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{ uri: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=466&q=80" }}
                                size={50}
                            />
                            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                <Title style={styles.title}>Jeremy León</Title>
                                <Caption style={styles.caption}>jeremisma2001@hotmail.com</Caption>
                            </View>
                        </View>

                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Home"
                            icon={({focused, color, size }) => (<Icon name="home-outline" color={color} size={size} />)}
                            onPress={() => {props.navigation.navigate("HOME") }}
                            activeTintColor="red"
                        />
                        <DrawerItem
                            label="Profile"
                            icon={({ color, size }) => (<Icon name="account-outline" color={color} size={size} />)}
                            onPress={() => {props.navigation.navigate("PROFILE")  }}
                        />
                        <DrawerItem
                            label="Map"
                            icon={({ color, size }) => (<Icon name="google-maps" color={color} size={size} />)}
                            onPress={() => { props.navigation.navigate("MAP")  }}
                        />
                        <DrawerItem
                            label="Notices"
                            icon={({ color, size }) => (<Icon name="bulletin-board" color={color} size={size} />)}
                            onPress={() => { props.navigation.navigate("NOTICES")  }}
                        />
                        <DrawerItem
                            label="Videos"
                            icon={({ color, size }) => (<Icon name="youtube-tv" color={color} size={size} />)}
                            onPress={() => {props.navigation.navigate("VIDEOS")   }}
                        />
                        <DrawerItem
                            label="Badges"
                            icon={({ color, size }) => (<Icon name="license" color={color} size={size} />)}
                            onPress={() => {props.navigation.navigate("BADGES")   }}
                        />
                        <DrawerItem
                            label="Suggestions"
                            icon={({ color, size }) => (<Icon name="form-select" color={color} size={size} />)}
                            onPress={() => {props.navigation.navigate("SUGGESTIONS")   }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>

                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    label="Sing Out"
                    icon={({ color, size }) => (<Icon name="exit-to-app" color={color} size={size} />)}
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingRight: 60
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,

        borderTopColor: '#f4f4f4',
        borderTopwidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});