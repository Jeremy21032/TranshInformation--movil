import React, { useEffect, useState, useContext } from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { AuthContext } from "./app/components/context";
import { loadFirebaseConfiguration } from "./app/util/FirebaseConfiguration";
import { RootStackScreen } from "./app/navs/RootStackScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootDrawerScreen } from "./app/navs/RootDrawerScreen";
import { getPersonalInfomation } from "./app/services/InfoServicesPersonal";
import * as styles from "./assets/styles/appStyles";
import { KnowStackScreen } from "./app/navs/KnowStackScreen";
import NetInfo from "@react-native-community/netinfo";
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  Text,
  LogBox,
} from "react-native";
import Lottie from "lottie-react-native";
import AppContext from "./app/context/AppContext";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  color: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: styles.colors.cultured,
    text: styles.colors.black,
  },
};
const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  color: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    text: styles.colors.cultured,
    background: styles.colors.black,
  },
};

const AppIndex = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [internetConection, setInternetConection] = useState("");
  const [isConnected, setIsConnected] = useState("");
  const { userInfo, handleUserInfo, userFirebase } = useContext(AppContext);
  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );
  const handleGetNetInfo = () => {
    NetInfo.fetch().then((state) => {
      console.log(state);

      setIsConnected(state.isConnected);
    });
  };
  useEffect(() => {
    console.log(
      "-------------------------USER INFO-----------------------------------------"
    );
    console.log(userInfo);
    console.log(
      "------------------------------------------------------------------"
    );
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state);
      setInternetConection(`Connection Type: ${state.type}
      Is Connected?: ${state.isConnected}
      IP Address: ${state.details.ipAddress}`);
      setIsConnected(state.isConnected);
      console.log(typeof isConnected, isConnected);
    });
    return unsubscribe();
  }, [internetConection]);
  const [login, setLogin] = React.useState(false);
  const theme = isDarkTheme ? CustomDefaultTheme : CustomDarkTheme;
  loadFirebaseConfiguration();

  useEffect(() => {
    async function modifyState() {
      if (userFirebase) {
        let verify = await getPersonalInfomation(userFirebase.email);
        handleUserInfo(verify);
        const email = userFirebase.email;
        global.email = email;
        global.direccionBase = verify.direccionBase;
      }
    }
    modifyState();
  }, [userFirebase]);
const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  const FirstNav = () => {
    return  userInfo&&userInfo.rol == "cliente" ? <SecondNav /> : <RootStackScreen />;
  };

  const SecondNav = () => {
    return global.direccionBase == null ? (
      <KnowStackScreen />
    ) : (
      <RootDrawerScreen />
    );
  };
  const InternetNav = () => {
    return login == true ? <FirstNav /> : <RootStackScreen />;
  };
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {isConnected == true ? (
            <InternetNav />
          ) : (
            <View style={stylesL.container}>
              <Text style={[stylesL.header, { color: styles.colors.darkBlue }]}>
                Para poder continuar.{"\n"}Activa tu conexión a internet.
              </Text>
              <View style={{ height: Dimensions.get("window").height / 2.2 }}>
                <Lottie
                  source={require("./assets/no-internet-connection.json")}
                  autoPlay
                  loop
                  style={{ height: "100%" }}
                />
                <View
                  style={{
                    width: Dimensions.get("window").width / 2,
                    alignSelf: "center",
                  }}
                >
                  <Button
                    title="Volver a intentar"
                    color={styles.colors.gradient2}
                    onPress={() => {
                      handleGetNetInfo();
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default AppIndex;

export const stylesL = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
