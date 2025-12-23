import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const SWIPE_LIMIT = width * 0.3;
const CARD_WIDTH = width - 60;
const CARD_HEIGHT = height * 0.55;

interface UserData {
    nama: string;
    foto: string;
    kota: string;
    hobby: string;
    credit: string;
}

interface SwipeableCardProps {
    user: UserData;
    index: number;
    totalCards: number;
    onSwipe: (direction: "left" | "right") => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    user,
    index,
    totalCards,
    onSwipe,
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isActive = index === totalCards - 1;

    const panGesture = Gesture.Pan()
        .enabled(isActive)
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            if (Math.abs(translateX.value) > SWIPE_LIMIT) {
                const direction = translateX.value > 0 ? "right" : "left";
                const toX = translateX.value > 0 ? width * 1.5 : -width * 1.5;

                // Call onSwipe immediately so the next card becomes active
                runOnJS(onSwipe)(direction);

                translateX.value = withSpring(toX, {
                    damping: 15,
                    stiffness: 150,
                });
                translateY.value = withSpring(translateY.value + 100, {
                    damping: 15,
                    stiffness: 150,
                });
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-width, 0, width],
            [-20, 0, 20]
        );

        const opacity = interpolate(
            Math.abs(translateX.value),
            [0, SWIPE_LIMIT],
            [0, 1]
        );

        const scale = interpolate(
            index,
            [totalCards - 3, totalCards - 2, totalCards - 1],
            [0.9, 0.95, 1]
        );

        const translateYValue = interpolate(
            index,
            [totalCards - 3, totalCards - 2, totalCards - 1],
            [20, 10, 0]
        );

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value + translateYValue },
                { rotate: `${rotate}deg` },
                { scale },
            ],
            opacity: index >= totalCards - 3 ? 1 : 0,
        };
    });

    const likeStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [0, SWIPE_LIMIT], [0, 1]);

        return {
            opacity: translateX.value > 0 ? opacity : 0,
        };
    });

    const nopeStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [-SWIPE_LIMIT, 0],
            [1, 0]
        );

        return {
            opacity: translateX.value < 0 ? opacity : 0,
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                style={[styles.card, animatedStyle, { zIndex: index }]}
            >
                <Image source={{ uri: user.foto }} style={styles.image} />

                {/* Like Badge */}
                <Animated.View style={[styles.likeBadge, likeStyle]}>
                    <Text style={styles.likeText}>LIKE</Text>
                </Animated.View>

                {/* Nope Badge */}
                <Animated.View style={[styles.nopeBadge, nopeStyle]}>
                    <Text style={styles.nopeText}>NOPE</Text>
                </Animated.View>

                {/* User Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{user.nama}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="location" size={18} color="#fff" />
                        <Text style={styles.detailText}>{user.kota}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="heart" size={18} color="#fff" />
                        <Text style={styles.detailText}>{user.hobby}</Text>
                    </View>
                    <Text style={styles.creditText}>{user.credit}</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default SwipeableCard;

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    infoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    nameContainer: {
        marginBottom: 8,
    },
    name: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    detailText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    creditText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 10,
        marginTop: 8,
        fontStyle: "italic",
    },
    likeBadge: {
        position: "absolute",
        top: 50,
        left: 30,
        borderWidth: 4,
        borderColor: "#4ade80",
        borderRadius: 10,
        padding: 10,
        transform: [{ rotate: "-20deg" }],
        zIndex: 10,
    },
    likeText: {
        color: "#4ade80",
        fontSize: 32,
        fontWeight: "bold",
    },
    nopeBadge: {
        position: "absolute",
        top: 50,
        right: 30,
        borderWidth: 4,
        borderColor: "#ef4444",
        borderRadius: 10,
        padding: 10,
        transform: [{ rotate: "20deg" }],
        zIndex: 10,
    },
    nopeText: {
        color: "#ef4444",
        fontSize: 32,
        fontWeight: "bold",
    },
});
