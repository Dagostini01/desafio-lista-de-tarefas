import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "../screens/Home";

describe("Tela Home", () => {
  it("deve adicionar uma nova tarefa na lista", async () => {

    const { getByPlaceholderText, getByTestId, getByText } = render(<Home />);

    const input = getByPlaceholderText("Adicione uma nova tarefa");
    const botaoAdicionar = getByTestId("botao-adicionar");

    fireEvent.changeText(input, "Tarefa de Teste");
    fireEvent.press(botaoAdicionar);

    await waitFor(() => {
      expect(getByText("Tarefa de Teste")).toBeTruthy();
    });
  });
});
