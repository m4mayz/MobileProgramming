import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import SwipeableCard from "../components/SwipeableCard";

interface UserData {
    nama: string;
    foto: string;
    kota: string;
    hobby: string;
    credit: string;
}

const UNSPLASH_KEY = "0EcBYD-zrNdOmGtQvI8em9DZIHQFqd3StWEhgwD4V2U";

const Settings = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [dislikedCount, setDislikedCount] = useState(0);

    const generateUserData = async (): Promise<UserData | null> => {
        try {
            const userRes = await fetch(
                "https://randomuser.me/api/?gender=female"
            );
            const userData = await userRes.json();
            const user = userData.results[0];

            const photoRes = await fetch(
                `https://api.unsplash.com/photos/random?query=woman-portrait&client_id=${UNSPLASH_KEY}`
            );
            const photoData = await photoRes.json();

            const hobbies = [
                "Painting",
                "Yoga",
                "Traveling",
                "Photography",
                "Coding",
            ];
            const randomHobby =
                hobbies[Math.floor(Math.random() * hobbies.length)];

            return {
                nama: `${user.name.first} ${user.name.last}`,
                kota: user.location.city,
                foto: photoData.urls.regular,
                hobby: randomHobby,
                credit: `Photo by ${photoData.user.name} on Unsplash`,
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        const userPromises = Array(10)
            .fill(null)
            .map(() => generateUserData());
        const fetchedUsers = await Promise.all(userPromises);
        const validUsers = fetchedUsers.filter(
            (user): user is UserData => user !== null
        );
        setUsers(validUsers);
        setCurrentIndex(0);
        setLikedCount(0);
        setDislikedCount(0);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSwipe = (direction: "left" | "right") => {
        console.log(`Swiped ${direction} on ${users[currentIndex]?.nama}`);
        if (direction === "right") {
            setLikedCount((prev) => prev + 1);
        } else {
            setDislikedCount((prev) => prev + 1);
        }
        setCurrentIndex((prev) => prev + 1);
    };

    const handleReset = () => {
        fetchUsers();
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#6366F1" />
                <Text style={styles.loadingText}>Loading profiles...</Text>
            </View>
        );
    }

    if (currentIndex >= users.length) {
        return (
            <View style={styles.container}>
                <Ionicons name="checkmark-circle" size={80} color="#4ade80" />
                <Text style={styles.emptyTitle}>No more profiles!</Text>
                <Text style={styles.emptySubtitle}>
                    You{"'"}ve seen all available profiles
                </Text>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                >
                    <Ionicons name="refresh" size={24} color="#fff" />
                    <Text style={styles.resetButtonText}>Load More</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* <Text style={styles.headerTitle}>Tinder Clone</Text>
                <Text style={styles.headerSubtitle}>
                    {users.length - currentIndex} profiles remaining
                </Text> */}
                <View style={styles.counterContainer}>
                    <View style={styles.counterItem}>
                        <MaterialCommunityIcons
                            name="heart-broken"
                            size={20}
                            color="#ef4444"
                        />
                        <Text style={styles.counterText}>{dislikedCount}</Text>
                    </View>
                    <View style={styles.counterItem}>
                        <MaterialCommunityIcons
                            name="heart"
                            size={20}
                            color="#4ade80"
                        />
                        <Text style={styles.counterText}>{likedCount}</Text>
                    </View>
                </View>
            </View>

            {/* Cards Stack */}
            <View style={styles.cardContainer}>
                {users
                    .slice(currentIndex, currentIndex + 3)
                    .reverse()
                    .map((user, idx, arr) => (
                        <SwipeableCard
                            key={currentIndex + (arr.length - 1 - idx)}
                            user={user}
                            index={idx}
                            totalCards={arr.length}
                            onSwipe={handleSwipe}
                        />
                    ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.nopeButton]}
                    onPress={() => handleSwipe("left")}
                >
                    <MaterialCommunityIcons
                        name="heart-broken"
                        size={32}
                        color="#ef4444"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons
                        name="chat-processing"
                        size={32}
                        color="#00000038"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.likeButton]}
                    onPress={() => handleSwipe("right")}
                >
                    <MaterialCommunityIcons
                        name="heart"
                        size={32}
                        color="#4ade80"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        position: "absolute",
        top: 60,
        alignItems: "center",
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#6366F1",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    counterContainer: {
        flexDirection: "row",
        marginTop: 12,
        gap: 24,
    },
    counterItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    counterText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
    },
    cardContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    actionButtons: {
        position: "absolute",
        bottom: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nopeButton: {
        borderWidth: 2,
        borderColor: "#ef4444",
    },
    likeButton: {
        borderWidth: 2,
        borderColor: "#4ade80",
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 8,
    },
    resetButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6366F1",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 24,
        gap: 8,
    },
    resetButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
