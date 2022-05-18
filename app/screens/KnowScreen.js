import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';
import * as styles from '../../assets/styles/appStyles'
import { LinearGradient } from 'expo-linear-gradient';
import { aniadirDireccionBase, getPlaces } from '../services/InfoServicesPersonal';
import DropDownPicker from 'react-native-dropdown-picker';

export const KnowScreen = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const { colors } = useTheme();
    let getItems = async () => {
        while (items.length) {
            items.pop();
        }
        let places = await getPlaces();
        for (let i = 0; i < places.length; i++) {
            if (items.includes(places[i])) {

            } else {
                items.push(places[i]);
            }
        }
        console.log("items", items)

    }
    React.useEffect(() => {
        getItems();
    }, [])
    let aniadirDireccion = async () => {
        await aniadirDireccionBase(selected);
    }
    return (
        <View style={styles.commons.signContainer}>
            <Text style={{ color: colors.text }}>Queremos saber más sobre tí</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(item) => {
                    console.log(item);
                    setSelected(item.label);

                }}
            />
            <Text style={{ color: colors.text }}>{selected}</Text>
            <TouchableOpacity
                onPress={() => { if (selected != null) { aniadirDireccion() } else { Alert.alert("asdasd", "asdasd") } }}
                style={{ width: '100%' }}
            >
                <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.commons.signIn}>
                    <Text style={[styles.commons.textSign, { color: "#fff" }]}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

