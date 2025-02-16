import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { s } from "./styles";
import { signIn } from "../../comps/signin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/routes";

export function Header() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  const [user, setUser] = useState<{ name: string; photo: string } | null>(null);

  useEffect(() => {
    const autoSignIn = async () => {
      try {
        const userInfo = await GoogleSignin.getCurrentUser();
        if (userInfo) {
          setUser({
            name: userInfo.user.name || "Usuário",
            photo: userInfo.user.photo || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    };

    autoSignIn();
  }, []);

  const handleSignIn = async () => {
    const userInfo = await signIn();
    if (userInfo) {
      setUser({
        name: userInfo.name || "Usuário",
        photo: userInfo.photo || "",
      });
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          onPress: async () => {
            try {
              await GoogleSignin.signOut();
              setUser(null);
              navigation.replace("Login");
            } catch (error) {
              console.error("Erro ao sair da conta:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={s.container}>
      <View style={s.userInfo}>
        <View style={s.user}>
          <Image
            style={s.image}
            source={
              user?.photo
                ? { uri: user.photo }
                : require("../../../assets/user.png")
            }
          />
          <View style={{ flex: 1 }}>
            <Text style={s.text}>Olá {user?.name || "Usuário"}!</Text>
            <Text style={s.text}>Seja bem-vindo ao App</Text>
          </View>
        </View>

        <TouchableOpacity onPress={user ? handleSignOut : handleSignIn}>
          <Ionicons 
            name={user ? "log-out" : "log-in"} 
            color={user ? "#ff0000" : "#00ff00"} 
            size={25} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
