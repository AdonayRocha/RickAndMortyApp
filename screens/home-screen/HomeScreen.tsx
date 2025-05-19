import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { getCharacters, Character } from '../../services/Api';
import { saveFavorite, removeFavorite, getFavoriteIds } from '../../utils/Storage';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Hud from '../../components/hud/Hud';
import LeftHandedSwitch from '../../components/left-handed-switch/LeftHandedSwitch';
import { useLeftHanded } from '../../contexts/LeftHandedContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
    const { leftHanded, setLeftHanded } = useLeftHanded();
    const animations = useRef<Record<number, Animated.Value>>({}).current;
    const switchOpacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    const fetchCharacters = async (pageNumber: number) => {
        const data = await getCharacters(pageNumber);
        if (data) {
            setCharacters(data.results);
            setHasNextPage(Boolean(data.info.next));
        }
    };

    const loadFavoriteIds = async () => {
        const favs = await getFavoriteIds();
        setFavoritesIds(favs);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadFavoriteIds);
        return unsubscribe;
    }, [navigation]);

    const handleFavoriteToggle = async (character: Character) => {
        const alreadyFav = favoritesIds.includes(character.id);
        if (alreadyFav) {
            await removeFavorite(character.id);
        } else {
            await saveFavorite(character);
            if (!animations[character.id]) animations[character.id] = new Animated.Value(0);
            animations[character.id].setValue(0);
            Animated.sequence([
                Animated.timing(animations[character.id], {
                    toValue: -10,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(animations[character.id], {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        loadFavoriteIds();
    };

    const handleSwitchPress = (value: boolean) => {
        setLeftHanded(value);
        Animated.sequence([
            Animated.timing(switchOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(switchOpacity, {
                toValue: 0.3,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const renderItem = ({ item }: { item: Character }) => {
        const animatedScale = new Animated.Value(1);
        const isFav = favoritesIds.includes(item.id);
        if (!animations[item.id]) animations[item.id] = new Animated.Value(0);

        const handlePressIn = () => {
            Animated.spring(animatedScale, {
                toValue: 1.05,
                useNativeDriver: true,
            }).start();
        };

        const handlePressOut = () => {
            Animated.spring(animatedScale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        return (
            <Animated.View
                style={[
                    styles.card,
                    {
                        backgroundColor: isFav ? '#a3f7bf' : '#1c003b',
                        transform: [
                            { scale: animatedScale },
                            { translateY: animations[item.id] },
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.cardContent}
                    activeOpacity={0.8}
                >
                    {leftHanded && (
                        <TouchableOpacity onPress={() => handleFavoriteToggle(item)} style={styles.leftHeartButton}>
                            <FontAwesome
                                name={isFav ? 'heart' : 'heart-o'}
                                size={24}
                                color={isFav ? 'red' : 'white'}
                            />
                        </TouchableOpacity>
                    )}
                    <View style={styles.imageContainer}>
                        <Animated.Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        {!leftHanded && (
                            <TouchableOpacity onPress={() => handleFavoriteToggle(item)} style={styles.leftHeartButton}>
                                <FontAwesome
                                    name={isFav ? 'heart' : 'heart-o'}
                                    size={24}
                                    color={isFav ? 'red' : 'white'}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <LeftHandedSwitch onChange={setLeftHanded} />
            <Text style={styles.title}>Rick and Morty - Personagens</Text>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            <Hud
                currentPage={page}
                hasNextPage={hasNextPage}
                onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
                onNext={() => setPage((prev) => prev + 1)}
                onGoToFavorites={() =>
                    navigation.navigate('Favorites', {
                        animation: 'none',
                    } as never)
                }
                hasFavorites={favoritesIds.length > 0}
                leftHanded={leftHanded}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a001a',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    card: {
        borderRadius: 10,
        padding: 10,
        marginVertical: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftHeartButton: {
        marginRight: 8,
        marginLeft: 0,
    },
    imageContainer: {
        marginRight: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        color: '#fff',
        flexShrink: 1,
        fontWeight: 'bold',
    },
    switchContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2D1B46',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    switchLabel: {
        color: '#fff',
        marginRight: 8,
        fontSize: 14,
    },
});
