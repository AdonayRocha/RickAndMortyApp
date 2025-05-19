import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const characterCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    margin: 10,
    padding: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  favoriteCard: {
    backgroundColor: colors.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
    fontWeight: 'bold',
  },
});