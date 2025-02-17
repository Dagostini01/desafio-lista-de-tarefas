import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#4EA8DE",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 22,
  },
  user: {
    flexDirection: "row",
    marginLeft: 20,
    gap: 12,
    flexShrink: 1,
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
