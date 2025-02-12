import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { s } from "./styles";

type Props = {
    conteudo: string;
    dataCriacao: string;
}

export function Tarefa({ conteudo, dataCriacao }: Props) {
    return (

        <View>

            <View style={s.container}>

                <TouchableOpacity style={s.button}>
                    <Ionicons name={"ellipse-outline"} size={20} color="#4EA8DE" />
                </TouchableOpacity>

                <Text style={s.text}>{conteudo}</Text>

                <TouchableOpacity>
                    <Ionicons style={s.button} name="trash" size={20} color="#808080" />
                </TouchableOpacity>

            </View>

            <Text style={s.textData}>Data Criação: {dataCriacao}</Text>
            
        </View>
    )
}