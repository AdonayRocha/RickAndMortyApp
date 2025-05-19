import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const favoriteScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        color: '#ccc',
    },
    backButtonRight: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6c00ff',
        padding: 10,
        borderRadius: 50,
        elevation: 8,
    },
    backButtonLeft: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#6c00ff',
        padding: 10,
        borderRadius: 50,
        elevation: 8,
    },
});