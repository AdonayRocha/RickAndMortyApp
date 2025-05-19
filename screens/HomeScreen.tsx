import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Character, getCharacters } from '../services/Api';
import { useNavigation } from '@react-navigation/native';
import CharacterCard from '../components/CharacterCard';
import { getFavorites, saveFavorite, removeFavorite } from '../utils/Storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    useEffect(() => {
        fetchData();
        loadFavorites();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        const data = await getCharacters(page);
        if (data) {
            setCharacters(data.results);
            setHasNextPage(Boolean(data.info.next));
            setHasPrevPage(Boolean(data.info.prev));
        }
        setLoading(false);
    };

    const loadFavorites = async () => {
        const favs = await getFavorites();
        setFavorites(favs.map((c) => c.id));
    };

    const isFavorite = (id: number) => favorites.includes(id);

    const handleFavoriteToggle = async (character: Character) => {
        if (isFavorite(character.id)) {
            await removeFavorite(character.id);
        } else {
            await saveFavorite(character);
        }
        loadFavorites();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rick and Morty - Personagens</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#00ffcc" />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    renderItem={({ item }) => (
                        <CharacterCard
                            character={item}
                            isFavorite={isFavorite(item.id)}
                            onFavoriteChange={() => handleFavoriteToggle(item)}
                        />
                    )}
                />
            )}

            <View style={styles.pagination}>
                {hasPrevPage && (
                    <TouchableOpacity onPress={() => setPage(page - 1)} style={styles.navButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                )}
                <Text style={styles.pageText}>Página {page}</Text>
                {hasNextPage && (
                    <TouchableOpacity onPress={() => setPage(page + 1)} style={styles.navButton}>
                        <Ionicons name="arrow-forward" size={24} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0033', // roxo escuro galáctico
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f5f5f5',
        textAlign: 'center',
        marginBottom: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#1C0049',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navButton: {
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#3700B3',
        borderRadius: 50,
    },
    pageText: {
        color: 'white',
        fontSize: 16,
    },
});
