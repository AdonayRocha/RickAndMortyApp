import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const hudStyles = StyleSheet.create({
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
        marginHorizontal: 5,
    },
    pageText: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 15,
    },
    heartButton: {
        marginLeft: 15,
        padding: 8,
        borderRadius: 20,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
});