import { useEffect } from "react";
import { View, Text, Alert, StatusBar } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { signIn } from "../../comps/signin";
import { s } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/routes";

export function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '870180552483-a70mhcg02j0ab011idknh9813li3f0rn.apps.googleusercontent.com',
      iosClientId: '870180552483-9n7dofp08tb8034se0rsi69bun7dmufv.apps.googleusercontent.com',
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      offlineAccess: true,
      forceCodeForRefreshToken: false,
    });
  }, []);

  const handleLogin = async () => {
    try {
      const userInfo = await signIn();
      if (userInfo) {
        navigation.navigate("Home", { user: userInfo });
      } else {
        Alert.alert("Erro", "Não foi possível fazer login");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao fazer login");
    }
  };

  return (
    <View style={s.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#4EA8DE"} />
      <Text style={s.text}>Realize o login com sua conta abaixo:</Text>
      <GoogleSigninButton onPress={handleLogin} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Light} />
    </View>
  );
}
