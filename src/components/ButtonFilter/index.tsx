
import { TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { s } from "./styles";

type Props = {
    onPress: () => void;
    iconName: keyof typeof Ionicons.glyphMap;
}

export function ButtonFilter({ onPress, iconName }: Props) {
    return (
        <View>
            <TouchableOpacity style={s.button} onPress={onPress}>
                <View>
                    <Ionicons name={iconName} size={15} color="#ffffff" />
                </View>
            </TouchableOpacity>

        </View>
    )
}