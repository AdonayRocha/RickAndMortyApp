import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Character } from '../services/Api';
import {
    getFavorites,
    removeFavorite,
} from '../utils/Storage';
import CharacterCard from '../components/CharacterCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
    const [favorites, setFavorites] = useState<Character[]>([]);

    const loadFavorites = async () => {
        const favs = await getFavorites();
        setFavorites(favs);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadFavorites);
        return unsubscribe;
    }, [navigation]);

    const handleRemoveFavorite = async (character: Character) => {
        await removeFavorite(character.id);
        loadFavorites();
    };

    const renderItem = ({ item }: { item: Character }) => (
        <CharacterCard
            character={item}
            isFavorite={true}
            onFavoriteChange={() => handleRemoveFavorite(item)}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.empty}>Nenhum favorito encontrado.</Text>
                }
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0221',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        color: '#ccc',
    },
    backButton: {
        backgroundColor: '#4B0082',
        margin: 20,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
