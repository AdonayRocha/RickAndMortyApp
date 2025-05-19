import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Character } from '../../services/Api';
import { saveFavorite, removeFavorite } from '../../utils/Storage';
import { FontAwesome } from '@expo/vector-icons';
import { useLeftHanded } from '../../contexts/LeftHandedContext';
import { characterCardStyles } from './CharacterCard.styles';

interface Props {
  character: Character;
  isFavorite: boolean;
  onFavoriteChange: () => void;
}

export default function CharacterCard({
  character,
  isFavorite,
  onFavoriteChange,
}: Props) {
  const [scale] = useState(new Animated.Value(1));
  const { leftHanded } = useLeftHanded();

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.05, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(character.id);
    } else {
      await saveFavorite(character);
    }
    onFavoriteChange();
  };

  return (
    <Animated.View
      style={[
        characterCardStyles.card,
        isFavorite && characterCardStyles.favoriteCard,  
        { transform: [{ scale }] },
      ]}
    >
      <View style={characterCardStyles.row}>
        {leftHanded && (
          <TouchableOpacity
            onPress={toggleFavorite}
            style={{ marginRight: 20 }}
          >
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color={isFavorite ? 'red' : 'white'}
            />
          </TouchableOpacity>
        )}
        <Image source={{ uri: character.image }} style={characterCardStyles.image} />
        <View style={characterCardStyles.info}>
          <Text style={characterCardStyles.name}>{character.name}</Text>
          {!leftHanded && (
            <TouchableOpacity onPress={toggleFavorite}>
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={isFavorite ? 'red' : 'white'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
