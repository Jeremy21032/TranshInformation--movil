import { Dimensions, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { Icon, Image, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Avatar, useTheme } from 'react-native-paper';
import * as styles from '../../../assets/styles/appStyles'

export const ListVideos = ({ infoVideos,index }) => {
    const navigation = useNavigation();
    const paperTheme = useTheme();
    return (
        <ListItem
            containerStyle={{
                minWidth: Dimensions.get('window').width,
                borderRadius: 7,
                borderColor: "#F5F6FA",
                marginVertical: 2,
                backgroundColor:paperTheme.dark==true?styles.colors.black:styles.colors.white
            }}
            onPress={() => {
                console.log("VALOR:" + infoVideos.title);
                navigation.navigate("VIDEOSDETAIL", { items: infoVideos });
            }}
            key={index}
        >
            <ListItem.Content style={{ flexDirection: "column" }}>
                <Image source={{ uri: infoVideos.prevImg }} style={{ height: 170, width: Dimensions.get('window').width - 50 }} />
                <View style={{ flexDirection: "row" ,alignItems: "center", minWidth: Dimensions.get('window').width/1.1,paddingVertical:5}}>
                    <View style={{ flexDirection: "column" }}>
                        <Avatar.Image source={{ uri:infoVideos.prevImg}} size={50} style={{marginHorizontal:10}} />
                    </View>
                    <View style={{ flexDirection: "column" }}>

                        <ListItem.Title style={{ color:paperTheme.dark==true?styles.colors.white: styles.colors.black}}>{infoVideos.title}</ListItem.Title>
                        <ListItem.Title style={{ color:paperTheme.dark==true?styles.colors.white: styles.colors.black}}>{infoVideos.author}</ListItem.Title>
                    </View>
                </View>

            </ListItem.Content>
        </ListItem>
    );
}


