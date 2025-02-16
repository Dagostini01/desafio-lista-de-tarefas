import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { s } from "./styles";
import { signIn } from "../../comps/signin";


export function Header() {

    return (
        <View style={s.container}>

            <View style={s.userInfo}>

                <View style={s.user}>
                    <Image style={s.image} />
                    <View style={{ flex: 1 }}>
                        <Text style={s.text}>Olá Pedro!</Text>
                        <Text style={s.text}>Seja bem-vindo ao App</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Ionicons name='power' color={"#ff0000"} size={25}/>
                </TouchableOpacity>
                
            </View>


        </View>
    )
}