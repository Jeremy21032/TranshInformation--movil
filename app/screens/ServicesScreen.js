import { FlatList, View } from "react-native";
import React, { Component, useContext } from "react";
import { ListContacts } from "./Lists/ListContacts";
import AppContext from "../context/AppContext";

class ServicesScreen extends Component {
  static contextType = AppContext

  render() {
    const { services } = this.context;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            data={services}
            numColumns={1}
            renderItem={({ item }) => {
              return <ListContacts items={item} />;
            }}
            keyExtractor={(item) => {
              return item.id;
            }}
          />
        </View>
      </View>
    );
  }
}
export { ServicesScreen };
