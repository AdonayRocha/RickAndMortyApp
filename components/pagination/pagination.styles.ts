import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const paginationStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        gap: 20,
    },
    button: {
        padding: 10,
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
    },
    pageText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
});