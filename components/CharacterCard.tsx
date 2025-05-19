import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Character } from '../services/Api';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  character: Character;
  isFavorite: boolean;
  onFavoriteChange: () => void;
}

export default function CharacterCard({ character, isFavorite, onFavoriteChange }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <TouchableOpacity onPress={onFavoriteChange} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ff4081' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c003d',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  name: {
    fontSize: 18,
    color: '#f5f5f5',
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 8,
  },
});
