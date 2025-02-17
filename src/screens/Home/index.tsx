import {
    View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, FlatList, StatusBar, Modal, Platform
} from "react-native";
import { s } from "./styles";
import { Tarefa } from "../../components/Tarefa";
import { useState, useEffect } from "react";
import { ButtonTarefa } from "../../components/ButtonTarefa";
import { ButtonFilter } from "../../components/ButtonFilter";
import { Header } from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {

    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<{ conteudo: string, dataCriacao: string }[]>([]);
    const [tarefaCheck, setTarefasCheck] = useState<string[]>([]);
    const [filtro, setFiltro] = useState<'Todas' | 'Concluídas' | 'Pendentes'>('Todas');
    const [filtroData, setFiltroData] = useState<string | null>(null);

    // Estado para modal no Android
    const [modalVisible, setModalVisible] = useState(false);
    const [inputData, setInputData] = useState("");

    useEffect(() => {
        const loadTarefas = async () => {
            try {
                const storedTarefas = await AsyncStorage.getItem("tarefas");
                const storedTarefasCheck = await AsyncStorage.getItem("tarefasCheck");

                if (storedTarefas) setTarefas(JSON.parse(storedTarefas));
                if (storedTarefasCheck) setTarefasCheck(JSON.parse(storedTarefasCheck));
            } catch (error) {
                console.error("Erro ao carregar tarefas do AsyncStorage:", error);
            }
        };

        loadTarefas();
    }, []);

    useEffect(() => {
        const saveTarefas = async () => {
            try {
                await AsyncStorage.setItem("tarefas", JSON.stringify(tarefas));
                await AsyncStorage.setItem("tarefasCheck", JSON.stringify(tarefaCheck));
            } catch (error) {
                console.error("Erro ao salvar tarefas no AsyncStorage:", error);
            }
        };

        saveTarefas();
    }, [tarefas, tarefaCheck]);

    function handleTarefaAdd() {
        if (!tarefa.trim()) {
            Alert.alert("Erro", "A tarefa não pode estar vazia.");
            return;
        }

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
                    setTarefasCheck(prevState => prevState.filter(tarefaCheck => tarefaCheck !== value));
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
        if (Platform.OS === "ios") {
            Alert.prompt("Filtrar por Data", "Digite a data desejada no formato DD/MM/AAAA:", [
                {
                    text: "Filtrar",
                    onPress: (data) => handleValidaFilter(data)
                },
                { text: "Cancelar", style: "cancel" }
            ]);
        } else {
            setModalVisible(true);
        }
    }

    function handleValidaFilter(data: string | undefined) {
        if (!data || !data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            Alert.alert("Formato inválido", "Por favor, digite a data no formato correto.");
            return;
        }
        setFiltroData(data);
        setModalVisible(false);
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

    function formatarData(text: string) {
        let cleaned = text.replace(/\D/g, '');
        if (cleaned.length > 2 && cleaned.length <= 4) {
            cleaned = cleaned.replace(/(\d{2})(\d{1,2})/, '$1/$2');
        } else if (cleaned.length > 4) {
            cleaned = cleaned.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
        }
        setInputData(cleaned);
    }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#4EA8DE"} />

            <SafeAreaView>
                <Header />
            </SafeAreaView>

            <View style={s.container}>

                <View style={s.form}>
                    <TextInput
                        style={s.input}
                        placeholder='Adicione uma nova tarefa'
                        placeholderTextColor="#6B6B6B"
                        value={tarefa}
                        onChangeText={setTarefa}
                    />
                    <ButtonTarefa testID="botao-adicionar" onPress={handleTarefaAdd} />
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
                    showsVerticalScrollIndicator={false}
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
                />
            </View>

            {/* Modal Android */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={s.modalContainer}>
                    <View style={s.modalContent}>
                        <Text style={s.modalText}>Digite a data:</Text>
                        <TextInput
                            style={s.modalInput}
                            placeholder="DD/MM/AAAA"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            value={inputData}
                            onChangeText={formatarData}
                            maxLength={10}
                        />
                        <TouchableOpacity onPress={() => handleValidaFilter(inputData)}>
                            <Text style={s.modalText}>Filtrar!!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
