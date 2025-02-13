import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";
import { Tarefa } from "../../components/Tarefa";
import { useState } from "react";
import { ButtonTarefa } from "../../components/ButtonTarefa";
import { ButtonFilter } from "../../components/ButtonFilter";

export default function Home() {

    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<{ conteudo: string, dataCriacao: string }[]>([]);
    const [tarefaCheck, setTarefasCheck] = useState<string[]>([]);

    function handleTarefaAdd() {
        const novaTarefa = { conteudo: tarefa, dataCriacao: new Date().toLocaleDateString() };
        setTarefas(prevState => [...prevState, novaTarefa]);
        setTarefa("");
    }

    function handleTarefaRemove(value: string) {
        Alert.alert("Apagar tarefa", "Deseja mesmo remover sua tarefa?", [
            {
                text: "Sim",
                onPress: () => {
                    setTarefas(prevState => prevState.filter(t => t.conteudo !== value));
                    setTarefasCheck(prevState => prevState.filter(tarefaCheck => tarefaCheck !== value))
                }
            },
            { text: "Não", style: 'cancel' }
        ]);
    }

    function handleTarefaCheck(value: string) {
        if (tarefaCheck.includes(value)) return;
        Alert.alert("Finalizar Tarefa", "Você finalizou mesmo essa tarefa?", [
            { text: "Sim", onPress: () => setTarefasCheck(prevState => [...prevState, value]) },
            { text: "Não", style: 'cancel' }
        ]);
    }

    return (
        <View style={s.container}>
            <SafeAreaView style={s.form}>
                <TextInput style={s.input} placeholder='Adicione uma nova tarefa' placeholderTextColor="#6B6B6B" value={tarefa} onChangeText={setTarefa} />
                <ButtonTarefa onPress={handleTarefaAdd} />
            </SafeAreaView>

            <View style={s.info}>
                <View style={s.description}>
                    <ButtonFilter iconName="calendar" onPress={() => { }} />
                </View>
                <View style={s.description}>
                    <Text style={s.descriptionText}>Criadas</Text>
                    <View style={s.descriptionNumber}>
                        <Text>{tarefas.length}</Text>
                    </View>
                </View>
                <View style={s.description}>
                    <Text style={s.descriptionText2}>Concluídas</Text>
                    <View style={s.descriptionNumber}>
                        <Text>{tarefaCheck.length}</Text>
                    </View>
                </View>
                <View style={s.description}>
                    <ButtonFilter iconName="filter" onPress={() => { }} />
                </View>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={tarefa => tarefa.conteudo}
                renderItem={({ item }) => (
                    <Tarefa
                        key={item.conteudo}
                        conteudo={item.conteudo}
                        dataCriacao={item.dataCriacao}
                        onRemove={() => handleTarefaRemove(item.conteudo)}
                        onCheck={() => handleTarefaCheck(item.conteudo)}
                        check={tarefaCheck.includes(item.conteudo)}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={s.containerlistEmptyText}>
                        <Ionicons name="documents-outline" size={100} color="#4EA8DE" />
                        <Text style={s.listEmptyText1}>Você ainda não tem tarefas cadastradas</Text>
                        <Text style={s.listEmptyText2}>Crie tarefas e organize seus itens a fazer</Text>
                    </View>
                )}
            />

        </View>
    )
}