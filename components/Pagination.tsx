import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

export default function Pagination({
    currentPage,
    hasNextPage,
    onPrevious,
    onNext,
}: PaginationProps) {
    return (
        <View style={styles.container}>
            {currentPage > 1 && (
                <TouchableOpacity style={styles.button} onPress={onPrevious}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )}
            <Text style={styles.pageText}>Página {currentPage}</Text>
            {hasNextPage && (
                <TouchableOpacity style={styles.button} onPress={onNext}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        gap: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#4b0082',
        borderRadius: 10,
    },
    pageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
