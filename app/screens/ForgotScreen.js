import { Dimensions, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as styles from '../../assets/styles/appStyles'
import { validateEmail } from '../services/Validations'
import {validateCorrectEmail} from '../services/Validate'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { ModalInfoError } from '../components/ModalInfoError'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { ModalInfoCorrect } from '../components/ModalInfoCorrect'
export const ForgotScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisibleError, setModalVisibleError] = React.useState(false);
    const [modalVisibleCorrect, setModalVisibleCorrect] = React.useState(false);
    const [messageCorrect, setMessageCorrect] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [messageError, setMessageError] = React.useState("");
    const auth = getAuth();
    let component = <LoadingOverlay isVisible={isLoading} setIsLoading={setIsLoading} setModalVisibleError={setModalVisibleError} setMessageError={setMessageError} />

    const [data, setData] = React.useState({
        email: '',
        isvalidEmail: true,
        isvalidPassword: true
    })
    const textInputChange = (val) => {
        let validator = validateEmail(val);

        if (validator.Result && val.trim().length >= 6) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isvalidEmail: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isvalidEmail: false
            })
        }
    }
    const forgotPassword = (mail) => {
        return sendPasswordResetEmail(auth, mail)
    }
    const handleForgotPassword = () => {
        const email = data.email;
        setIsLoading(true);
        forgotPassword(email).then(() => {
            setModalVisibleCorrect(true);
            setMessageCorrect("El correo fue enviado al correo:\n"+data.email+"\nRecuerde revisar la bandeja de SPAM (Correo no deseado)")
            setIsLoading(false);
        }
        ).catch(
            (error)=>{
                setIsLoading(false);
                setModalVisibleError(true);
                setMessageError(error.message)
            }
        )
    }


    return (
        <View style={styles.commons.signContainer}>
            <StatusBar backgroundColor={styles.colors.darkCyan} barStyle="light-content" />
            <View style={styles.commons.header}>
                <Text style={styles.commons.text_header}>Recover Password</Text>

            </View>
            <Animatable.View
                style={[styles.commons.footer, { justifyContent: "center" }]}
                animation="fadeInUpBig"
            >
                {/* A email input field. */}
                <Text style={styles.commons.text_footer}>Email</Text>
                <View style={styles.commons.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder='Your Email'
                        style={styles.commons.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : <></>}
                </View>
                {data.isvalidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.commons.errorMsg}>Email must have the correct format</Text>
                    </Animatable.View>
                }
                {/* A button. */}

                <View style={styles.commons.button}>
                    <TouchableOpacity style={styles.commons.signIn} onPress={() => {
                        if (data.email != null && data.email != '') {
                            let validator = validateEmail(data.email);
                            if (validator.Result) {
                                // setIsLoading(true);
                                // navigation.navigate("HOMEIN")
                                handleForgotPassword(data.email);
                                console.log("llego")

                            } else {
                                setModalVisibleError(true)
                                setMessageError(validator.message);
                            }
                        } else {
                            setModalVisibleError(true)
                            setMessageError("Verifique el email proporcionado");
                        }
                    }}>

                        <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.commons.signIn}>
                            <Text style={[styles.commons.textSign, { color: "#fff" }]}>Send Email</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SIGNIN")}
                        style={[styles.commons.signIn, { borderColor: styles.colors.darkCyan, borderWidth: 1, marginTop: 15 }]}>
                        <Text style={[styles.commons.textSign, { color: styles.colors.darkCyan }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                {isLoading ? component : <View></View>}
                <ModalInfoError
                    modalVisible={modalVisibleError}
                    setModalVisible={setModalVisibleError}
                    message={messageError}
                >
                </ModalInfoError>
                <ModalInfoCorrect
                    modalVisible={modalVisibleCorrect}
                    setModalVisible={setModalVisibleCorrect}
                    message={messageCorrect}
                >
                </ModalInfoCorrect>

            </Animatable.View>
        </View>
    )
}

