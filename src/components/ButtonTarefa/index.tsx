import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";

type Props = {
    onPress: () => void;
}

export function ButtonTarefa({ onPress }: Props) {
    return (
        <View>
            <TouchableOpacity style={s.button} onPress={onPress}>
                <View>
                    <Text style={s.buttonText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}