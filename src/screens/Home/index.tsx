import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";
import { Tarefa } from "../../components/Tarefa";
import { useState } from "react";
import { ButtonTarefa } from "../../components/ButtonTarefa";
import { ButtonFilter } from "../../components/ButtonFilter";
import { Header } from "../../components/Header";

export default function Home() {

    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<{ conteudo: string, dataCriacao: string }[]>([]);
    const [tarefaCheck, setTarefasCheck] = useState<string[]>([]);
    const [filtro, setFiltro] = useState<'Todas' | 'Concluídas' | 'Pendentes'>('Todas');
    const [filtroData, setFiltroData] = useState<string | null>(null);

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

    function handleTarefaFilterData() {
        Alert.prompt("Filtrar por Data", "Digite a data desejada no formato DD/MM/AAAA:", [
            {
                text: "Filtrar",
                onPress: (data) => {
                    if (!data || !data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                        Alert.alert("Formato inválido", "Por favor, digite a data no formato correto.");
                        return;
                    }
                    setFiltroData(data);
                }
            },
            { text: "Cancelar", style: "cancel" }
        ]);
    }

    function handleTarefaFilter() {
        Alert.alert("Filtrar Tarefas", "Selecione o tipo de filtro para as suas tarefas:", [
            { text: "Todas", onPress: () => setFiltro("Todas") },
            { text: "Concluídas", onPress: () => setFiltro("Concluídas") },
            { text: "Pendentes", onPress: () => setFiltro("Pendentes") }
        ]);
    }

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroData && tarefa.dataCriacao !== filtroData) return false;
        if (filtro === "Todas") return true;
        if (filtro === "Concluídas") return tarefaCheck.includes(tarefa.conteudo);
        if (filtro === "Pendentes") return !tarefaCheck.includes(tarefa.conteudo);
    });

    return (

        <View>

            <SafeAreaView>
                <Header />
            </SafeAreaView>

            <View style={s.container}>

                <View style={s.form}>
                    <TextInput style={s.input} placeholder='Adicione uma nova tarefa' placeholderTextColor="#6B6B6B" value={tarefa} onChangeText={setTarefa} />
                    <ButtonTarefa onPress={handleTarefaAdd} />
                </View>

                <View style={s.info}>
                    <View style={s.description}>
                        <ButtonFilter iconName="calendar" onPress={handleTarefaFilterData} />
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
                        <ButtonFilter iconName="filter" onPress={handleTarefaFilter} />
                    </View>
                </View>

                <FlatList
                    data={tarefasFiltradas}
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
            
        </View>

    )
}