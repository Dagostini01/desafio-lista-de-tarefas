import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";

type Props = {
    onPress: () => void;
    testID?: string;
}

export function ButtonTarefa({ onPress, testID }: Props) {
    return (
        <View>
            <TouchableOpacity style={s.button} onPress={onPress} testID={testID}>
                <View>
                    <Text style={s.buttonText}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}