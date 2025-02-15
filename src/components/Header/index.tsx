import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, View, Text, TouchableOpacity } from "react-native";
import { s } from "./styles";

export function Header() {
    return (
        <View style={s.container}>

            <View style={s.userInfo}>

                <View style={s.user}>
                    <Image style={s.image} />
                    <View style={{ flex: 1 }}>
                        <Text>Olá Pedro!</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Ionicons name='power' />
                </TouchableOpacity>
                
            </View>


        </View>
    )
}