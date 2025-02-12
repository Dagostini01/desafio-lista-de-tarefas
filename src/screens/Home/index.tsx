import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";

export default function Home() {
    return (
        <View style={s.container}>
            <SafeAreaView style={s.form}>
                <TextInput style={s.input} placeholder='Adicione uma nova tarefa' />
                <TouchableOpacity style={s.button}>
                    <View>
                        <Text style={s.buttonText}>+</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

            <View style={s.info}>
                <View style={s.description}>
                    <TouchableOpacity style={s.button2}>
                        <View>
                            <Ionicons name="calendar" size={15} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={s.description}>
                    <Text style={s.descriptionText}>Criadas</Text>
                    <View style={s.descriptionNumber}>
                        <Text>0</Text>
                    </View>
                </View>
                <View style={s.description}>
                    <Text style={s.descriptionText2}>Concluídas</Text>
                    <View style={s.descriptionNumber}>
                        <Text>0</Text>
                    </View>
                </View>
                <View style={s.description}>
                    <TouchableOpacity style={s.button2}>
                        <View>
                            <Ionicons name="filter" size={15} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}