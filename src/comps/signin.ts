import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

export const signIn = async (): Promise<User["user"] | null> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log("User Info: ", response);

    if (isSuccessResponse(response)) {
      return response.data.user; // Retorna APENAS os dados do usuário
    }
    return null;
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Sign-in already in progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play Services not available");
          break;
        default:
          console.log("Google Sign-in error:", error);
      }
    } else {
      console.log("Unexpected error:", error);
    }
    return null;
  }
};
