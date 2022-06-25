import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getContacts } from "../services/ContactServices";
import { ListContacts } from "./Lists/ListContacts";

export const ServicesScreen = () => {
  const [contactos, setContactos] = useState([]);


  useEffect(() => {
    getContacts(setContactos);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={contactos}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <ListContacts items={item} />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
};
