import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BREAKPOINTS = {
    tablet: 768,
    largeTablet: 1024,
};

const featureCards = [
    {
        title: "Dashboard",
        description: "Ringkasan singkat performa bisnis Anda.",
        icon: "analytics" as const,
    },
    {
        title: "Calendar",
        description: "Atur jadwal meeting dan to-do secara terstruktur.",
        icon: "calendar" as const,
    },
    {
        title: "Tasks",
        description: "Lacak progres tugas tim secara real-time.",
        icon: "checkmark-circle" as const,
    },
    {
        title: "Messages",
        description: "Komunikasi cepat antar anggota tim.",
        icon: "chatbubbles" as const,
    },
];

export default function HomeScreen() {
    const { width, height } = useWindowDimensions();
    const isTablet = width >= BREAKPOINTS.tablet;
    const isLargeTablet = width >= BREAKPOINTS.largeTablet;
    const isLandscape = width > height;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    isTablet ? styles.containerTablet : styles.containerMobile,
                ]}
            >
                <View
                    style={[
                        styles.hero,
                        isTablet ? styles.heroTablet : styles.heroMobile,
                        isLargeTablet && styles.heroLargeTablet,
                    ]}
                >
                    <Text style={styles.overline}>
                        {isLargeTablet
                            ? "Large Tablet"
                            : isTablet
                            ? "Tablet"
                            : "Mobile"}{" "}
                        View {isLandscape && "• Landscape"}
                    </Text>
                    <Text style={styles.title}>Dashboard Responsive</Text>
                    <Text style={styles.subtitle}>
                        Contoh layout yang otomatis menyesuaikan tampilan tablet
                        & ponsel.
                    </Text>
                </View>

                <View
                    style={[
                        styles.cardGrid,
                        isTablet
                            ? styles.cardGridTablet
                            : styles.cardGridMobile,
                        isLargeTablet && styles.cardGridLargeTablet,
                    ]}
                >
                    {featureCards.map((card) => (
                        <View
                            key={card.title}
                            style={[
                                styles.card,
                                isTablet
                                    ? styles.cardTablet
                                    : styles.cardMobile,
                                isLargeTablet && styles.cardLargeTablet,
                            ]}
                        >
                            <Ionicons
                                name={card.icon}
                                size={isLargeTablet ? 48 : isTablet ? 40 : 32}
                                color="#8AB4FF"
                                style={styles.cardIcon}
                            />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>
                                    {card.title}
                                </Text>
                                <Text style={styles.cardDesc}>
                                    {card.description}
                                </Text>
                            </View>
                        </View>
                    ))}
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
        flexGrow: 1,
        gap: 24,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    containerMobile: {
        alignItems: "stretch",
    },
    containerTablet: {
        maxWidth: 960,
        alignSelf: "center",
    },
    containerLargeTablet: {
        maxWidth: 1200,
    },
    hero: {
        borderRadius: 24,
        padding: 24,
        backgroundColor: "#111C33",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
    },
    heroMobile: {
        alignItems: "flex-start",
    },
    heroTablet: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
    },
    heroLargeTablet: {
        padding: 32,
        gap: 32,
    },
    overline: {
        color: "#8AB4FF",
        letterSpacing: 1,
        fontSize: 12,
        textTransform: "uppercase",
        marginBottom: 8,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "700",
    },
    subtitle: {
        color: "#B8C6E3",
        fontSize: 16,
        marginTop: 8,
    },
    cardGrid: {
        flexWrap: "wrap",
    },
    cardGridMobile: {
        flexDirection: "column",
        gap: 12,
    },
    cardGridTablet: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "space-between",
    },
    cardGridLargeTablet: {
        gap: 20,
    },
    card: {
        flexGrow: 1,
        flexDirection: "row",
        gap: 15,
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#162544",
    },
    cardContent: {
        flex: 1,
        justifyContent: "center",
    },

    cardMobile: {
        width: "100%",
    },
    cardTablet: {
        width: "50%",
    },
    cardLargeTablet: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    cardDesc: {
        color: "#B8C6E3",
        fontSize: 14,
        lineHeight: 20,
    },
    cardIcon: {
        marginBottom: 12,
    },
});
