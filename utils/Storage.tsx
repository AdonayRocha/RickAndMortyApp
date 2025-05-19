import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../services/Api';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async (): Promise<Character[]> => {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveFavorite = async (character: Character): Promise<void> => {
    const favorites = await getFavorites();
    const exists = favorites.find((item) => item.id === character.id);
    if (!exists) {
        await AsyncStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify([...favorites, character])
        );
    }
};

export const removeFavorite = async (id: number): Promise<void> => {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter((item) => item.id !== id);
    await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(newFavorites)
    );
};

export const isFavorite = async (id: number): Promise<boolean> => {
    const favorites = await getFavorites();
    return favorites.some((item) => item.id === id);
};
