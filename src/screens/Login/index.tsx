import { View, Text } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import {signIn} from "../../comps/signin";

GoogleSignin.configure({
    webClientId: '870180552483-a70mhcg02j0ab011idknh9813li3f0rn.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
    iosClientId: '870180552483-9n7dofp08tb8034se0rsi69bun7dmufv.apps.googleusercontent.com',
});

export function Login() {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Login com o google</Text>
            <GoogleSigninButton onPress={signIn} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Light}/>
        </View>
    )
}