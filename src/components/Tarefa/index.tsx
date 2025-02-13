import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";

type Props = {
    conteudo: string;
    dataCriacao: string;
    check: boolean;
    onRemove: () => void;
    onCheck: () => void;
}

export function Tarefa({ conteudo, dataCriacao, onRemove, onCheck, check }: Props) {
    return (

        <View>

            <View style={s.container}>

                <TouchableOpacity style={s.button} onPress={onCheck}>
                    <Ionicons name={check ? "checkmark-circle" : "ellipse-outline"} size={20} color="#4EA8DE" />
                </TouchableOpacity>

                <Text style={check ? s.text2 : s.text}>{conteudo}</Text>

                <TouchableOpacity onPress={onRemove}>
                    <Ionicons style={s.button} name="trash" size={20} color="#808080" />
                </TouchableOpacity>

            </View>

            <Text style={s.textData}>Data Criação: {dataCriacao}</Text>

        </View>
    )
}