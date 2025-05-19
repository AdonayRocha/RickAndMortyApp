import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hudStyles } from './hud.styles';

interface HudProps {
    currentPage: number;
    hasNextPage: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onGoToFavorites: () => void;
    hasFavorites: boolean;
    leftHanded?: boolean;
}

export default function Hud({
    currentPage,
    hasNextPage,
    onPrevious,
    onNext,
    onGoToFavorites,
    hasFavorites,
    leftHanded = false, 
}: HudProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateHeart = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleFavoritePress = () => {
        animateHeart();
        onGoToFavorites();
    };

    return (
        <View style={hudStyles.container}>
            {leftHanded && (
                <TouchableOpacity onPress={handleFavoritePress} style={hudStyles.heartButton}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Ionicons
                            name={hasFavorites ? 'heart' : 'heart-outline'}
                            size={28}
                            color={hasFavorites ? 'red' : 'white'}
                        />
                    </Animated.View>
                </TouchableOpacity>
            )}

            {currentPage > 1 && (
                <TouchableOpacity style={hudStyles.button} onPress={onPrevious}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )}

            <Text style={hudStyles.pageText}>Página {currentPage}</Text>

            {hasNextPage && (
                <TouchableOpacity style={hudStyles.button} onPress={onNext}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            )}

            {!leftHanded && (
                <TouchableOpacity onPress={handleFavoritePress} style={hudStyles.heartButton}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Ionicons
                            name={hasFavorites ? 'heart' : 'heart-outline'}
                            size={28}
                            color={hasFavorites ? 'red' : 'white'}
                        />
                    </Animated.View>
                </TouchableOpacity>
            )}
        </View>
    );
}
