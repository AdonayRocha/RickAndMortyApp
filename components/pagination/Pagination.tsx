import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { paginationStyles } from './pagination.styles';

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
        <View style={paginationStyles.container}>
            {currentPage > 1 && (
                <TouchableOpacity style={paginationStyles.button} onPress={onPrevious}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )}
            <Text style={paginationStyles.pageText}>Página {currentPage}</Text>
            {hasNextPage && (
                <TouchableOpacity style={paginationStyles.button} onPress={onNext}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
}
