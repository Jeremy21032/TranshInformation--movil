import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../assets/styles/appStyles";
import {  useTheme } from "react-native-paper";
import {FAB} from 'react-native-elements'
import { getSuggestion } from "../services/SuggestionsServices";
import {ListSuggestion} from './Lists/ListSuggestion'
export const SuggestionsScreen = ({navigation}) => {
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      const fillSuggestion=async()=>{

        await getSuggestion(setSuggestions);
      }
      fillSuggestion();
      setRefreshing(false);
    });
  }, []);
  useEffect(() => {
    const unsubscribe =navigation.addListener('focus',()=>{

      onRefresh();
      return unsubscribe;
    });
    
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[commonStyles.colors.gradient1]}
          progressBackgroundColor={commonStyles.colors.white}
        />
      }>
      <Text style={[styles.header, { color: paperTheme.colors.text }]}>
        Historial
      </Text>
      <Text style={[styles.header, { color: paperTheme.colors.text }]}>
        Sus ideas y sugerencias son importantes para nostros, gracias a sus
        comentarios podemos identificar las áreas que podemos mejorar.
      </Text>
      
        {suggestions.length <= 0 ? (
          <View style={styles.arrayView}>
          <Text style={{ color: "red", fontSize: 22, textAlign: "center" }}>
            Aún no cuentas con sugerencias.
          </Text>
          <Text style={{ color: "red", fontSize: 22, textAlign: "center" }}>
            Si tienes un comentario o sugerencia, por favor háznoslo saber
          </Text>
        </View>
        ) : (
          <View>
            <FlatList
          data={suggestions}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <ListSuggestion
                infoSuggestion={item}
               refresh={onRefresh}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
          </View>
        )}
      </ScrollView>
        <FAB
          icon={{ name: 'add', color: 'white' }}
          placement="right"
          color={commonStyles.colors.darkCyan}
          onPress={() =>{navigation.navigate("EDITARSUGERENCIAS")}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex:1,
  },
  input: {
    margin: 12,
    borderWidth: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "justify",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
    alignSelf: "center",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  arrayView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height / 2,
  },
});
