import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({
      idToken: "test-token",
      user: { name: "Test User", email: "test@example.com" }
    }),
    signOut: jest.fn(),
  },
}));

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
