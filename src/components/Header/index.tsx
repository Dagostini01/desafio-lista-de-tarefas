import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { s } from "./styles";
import { signIn } from "../../comps/signin";

export function Header() {
  const [user, setUser] = useState<{ name: string; photo: string } | null>(null);

  useEffect(() => {
    
    const autoSignIn = async () => {
      const userInfo = await signIn();
      if (userInfo) {
        setUser({
          name: userInfo.name || "Usuário",
          photo: userInfo.photo || "",
        });
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

  return (
    <View style={s.container}>
      <View style={s.userInfo}>
        <View style={s.user}>
          <Image
            style={s.image}
            source={
              user?.photo
                ? { uri: user.photo }
                : require("../../../assets/user.png") // Imagem padrão
            }
          />
          <View style={{ flex: 1 }}>
            <Text style={s.text}>Olá {user?.name || "Usuário"}!</Text>
            <Text style={s.text}>Seja bem-vindo ao App</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSignIn}>
          <Ionicons name="power" color={"#ff0000"} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
