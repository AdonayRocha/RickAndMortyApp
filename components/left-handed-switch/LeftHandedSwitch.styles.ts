import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const leftHandedSwitchStyles = StyleSheet.create({
    switchContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    switchLabel: {
        color: colors.text,
        marginRight: 8,
        fontSize: 14,
    },
});