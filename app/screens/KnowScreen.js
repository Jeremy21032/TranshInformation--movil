import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert, Modal } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import { useTheme } from 'react-native-paper';
import * as styles from '../../assets/styles/appStyles'
import { LinearGradient } from 'expo-linear-gradient';
import { aniadirDireccionBase, getPersonalInfomation, getPlaces } from '../services/InfoServicesPersonal';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from 'react-native-elements';


export const KnowScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = React.useState('');
    const [show, setShow] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const { colors } = useTheme();
    const [mode, setMode] = React.useState('date');
    const [date2, setDate2] = React.useState(new Date());
    const [date, setDate] = React.useState("00-00-0000");
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isvalidEmail: true,
        isvalidPassword: true
    })
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
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date2;
        setShow(Platform.OS === "windows");
        setDate2(currentDate);
        let tempDate = new Date(currentDate);
        let fDate =
            (tempDate.getDate() < 10 ? "0" : "") +
            tempDate.getDate() +
            "-" +
            (tempDate.getMonth() < 9 ? "0" : "") +
            (tempDate.getMonth() + 1) +
            "-" +
            tempDate.getFullYear();
        setDate(fDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    React.useEffect(() => {
        getItems();
    }, [])
    let aniadirDireccion = async () => {
        await aniadirDireccionBase(selected);
        let usuario = await getPersonalInfomation();
        if (usuario.direcionBase != null) {
            navigation.navigate("HOMEKN");
        }
    }
    return (
        <View style={styles.commons.signContainer}>
            <View style={styles.commons.header}>
                <Text style={styles.commons.text_header}>Hola, {global.name}.</Text>
                <Text style={styles.commons.text_header}></Text>
                <Text style={styles.commons.text_header}>Antes de continuar, queremos conocerte un poco más.</Text>

            </View>
            <Animatable.View
                style={stylesK.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.commons.description}>Por que para nosotros eres importante, queremos formar parte de tus momentos importantes</Text>
                <Text style={[styles.commons.text_footer, {
                    marginTop: 35
                }]}>Fecha de Nacimiento</Text>
                <View style={[styles.commons.action, { marginBottom: 35 }]}>
                    <FontAwesome
                        name="birthday-cake"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder={date}
                        style={styles.commons.textInput}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => showMode("date")}>
                        <Feather
                            name="calendar"
                            color="grey"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()}
                    />
                )}
                <Text style={styles.commons.description}>Selecciona  el sector donde vives.</Text>
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
                        <Text style={[styles.commons.textSign, { color: "#fff" }]}>Continuar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    )
}


export const stylesK = StyleSheet.create({
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    }
})
