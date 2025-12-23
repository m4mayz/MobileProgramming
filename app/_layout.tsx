import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#0B1120",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    contentStyle: { backgroundColor: "#0B1120" },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Mobile Device Programming",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="task10"
                    options={{
                        title: "Tugas Sesi 10",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="task11"
                    options={{
                        title: "Tugas Sesi 11",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="task12"
                    options={{
                        title: "Tugas Sesi 12",
                        headerShown: false,
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
