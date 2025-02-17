import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  form: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 56,
    marginRight: 7,
    backgroundColor: "#262626",
    borderRadius: 5,
    color: "#FFF",
    padding: 16,
    fontSize: 16,
  },

  info: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  descriptionText: {
    fontSize: 15,
    color: "#4EA8DE",
    fontWeight: "bold",
    marginRight: 5,
  },
  descriptionText2: {
    fontSize: 15,
    color: "#8284FA",
    fontWeight: "bold",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  descriptionNumber: {
    backgroundColor: "#33333333",
    padding: 4,
    borderRadius: 5,
    width: 25,
    alignItems: "center",
  },
  tarefaView: {},
  listEmptyText1: {
    color: "#33333333",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
  },
  listEmptyText2: {
    color: "#33333333",
    textAlign: "center",
    fontSize: 22,
  },
  containerlistEmptyText: {
    marginTop: 100,
    alignItems: "center",
  },
  /*** Estilos do Modal para Android ***/
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro para o efeito de sobreposição
  },
  modalContent: {
    backgroundColor: "#4EA8DE",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalInput: {
    width: "100%",
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4EA8DE",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalCancelButton: {
    marginTop: 10,
  },
  modalCancelText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
});
