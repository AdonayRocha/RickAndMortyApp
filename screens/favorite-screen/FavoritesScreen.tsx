import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Character } from '../../services/Api';
import { getFavorites, removeFavorite } from '../../utils/Storage';
import CharacterCard from '../../components/character-card/CharacterCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FontAwesome } from '@expo/vector-icons';
import LeftHandedSwitch from '../../components/left-handed-switch/LeftHandedSwitch';
import { useLeftHanded } from '../../contexts/LeftHandedContext';
import { favoriteScreenStyles } from './FavoriteScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
    const [favorites, setFavorites] = useState<Character[]>([]);
    const { leftHanded, setLeftHanded } = useLeftHanded();

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
        <View style={favoriteScreenStyles.container}>
            <LeftHandedSwitch onChange={setLeftHanded} />

            <Text style={favoriteScreenStyles.title}>Favoritos</Text>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={favoriteScreenStyles.empty}>Nenhum favorito encontrado.</Text>
                }
            />

            <TouchableOpacity
                style={leftHanded ? favoriteScreenStyles.backButtonLeft : favoriteScreenStyles.backButtonRight}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
