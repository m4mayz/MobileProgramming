import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TaskItem {
    id: number;
    title: string;
    route: string;
}

const tasks: TaskItem[] = [
    {
        id: 10,
        title: "Tugas Sesi 10",
        route: "/task10",
    },
    {
        id: 11,
        title: "Tugas Sesi 11",
        route: "/task11",
    },
    {
        id: 12,
        title: "Tugas Sesi 12",
        route: "/task12",
    },

    // Tambahkan tugas sesi lainnya di sini
];

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="school" size={48} color="#60A5FA" />
                    <Text style={styles.title}>Mobile Device Programming</Text>
                    <Text style={styles.subtitle}>
                        Kumpulan Tugas Sesi Pembelajaran
                    </Text>
                </View>

                <View style={styles.taskList}>
                    {tasks.map((task) => (
                        <Link key={task.id} href={task.route as any} asChild>
                            <TouchableOpacity style={styles.taskCard}>
                                <View style={styles.taskIconContainer}>
                                    <Ionicons
                                        name="document-text"
                                        size={32}
                                        color="#60A5FA"
                                    />
                                </View>
                                <View style={styles.taskContent}>
                                    <View style={styles.taskHeader}>
                                        <Text style={styles.taskTitle}>
                                            {task.title}
                                        </Text>
                                    </View>

                                    <View style={styles.taskFooter}>
                                        <Text style={styles.viewLink}>
                                            Lihat Tugas
                                        </Text>
                                        <Ionicons
                                            name="arrow-forward"
                                            size={16}
                                            color="#60A5FA"
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Total {tasks.length} Tugas
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0B1120",
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#94A3B8",
        marginTop: 8,
        textAlign: "center",
    },
    taskList: {
        flex: 1,
        gap: 16,
    },
    taskCard: {
        flexDirection: "row",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#334155",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    taskIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: "#1E3A8A",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    taskContent: {
        flex: 1,
    },
    taskHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        flex: 1,
    },
    taskDate: {
        fontSize: 12,
        color: "#94A3B8",
        marginLeft: 8,
    },
    taskDescription: {
        fontSize: 14,
        color: "#CBD5E1",
        lineHeight: 20,
        marginBottom: 12,
    },
    taskFooter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    viewLink: {
        fontSize: 14,
        fontWeight: "600",
        color: "#60A5FA",
    },
    footer: {
        marginTop: 32,
        alignItems: "center",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#334155",
    },
    footerText: {
        fontSize: 14,
        color: "#64748B",
    },
});
