import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native-elements';
import {ListVideos} from './Lists/ListVideos';

export const VideosScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [selected, isSelected] = React.useState(false);
  const [data, setData] = React.useState([
    {
      urlID: 'X-yIEMduRXk',
      title: "Easy On Me",
      author: 'Adele',
      id: '1',
      prevImg:'https://img.youtube.com/vi/X-yIEMduRXk/maxresdefault.jpg'
      
    },
    {
      urlID: '-8VfKZCOo_I',
      title: 'Bam Bam',
      author: 'Camila Cabello ft. Ed Sheeran',
      id: '2',
      prevImg:'https://img.youtube.com/vi/-8VfKZCOo_I/maxresdefault.jpg'
    },
    {
      urlID: 'TYrcdhots80',
      author: 'Morat',
      title: ' A Dónde Vamos',
      id: '3',
      prevImg:'https://img.youtube.com/vi/TYrcdhots80/maxresdefault.jpg'
    }, {
      urlID: 'QpKkNIT84GY',
      author: 'Bad Bunny',
      title: ' Tití Me Preguntó',
      id: '4',
      prevImg:'https://img.youtube.com/vi/QpKkNIT84GY/maxresdefault.jpg'
    }

  ]);
  return (
    <View>
      <FlatList
        data={data}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <ListVideos
              infoVideos={item}
              containerStyle={{
                borderColor: selected == false ? "green" : "red",
              }}
            />
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
      <Text style={{ color: colors.text }}>VideosScreen</Text>
      <Button title="Go" onPress={() => { navigation.navigate("VIDEOSDETAIL") }} />
      <Button title="Go2" onPress={() => { navigation.navigate("VIDEOSSCS") }} />
    </View>
  )
}


const styles = StyleSheet.create({})