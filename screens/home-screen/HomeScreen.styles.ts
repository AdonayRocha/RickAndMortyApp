import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        color: colors.text,
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
        color: colors.text,
        flexShrink: 1,
        fontWeight: 'bold',
    },
});