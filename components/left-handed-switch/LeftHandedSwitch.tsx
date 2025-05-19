import React, { useRef } from 'react';
import { Animated, Switch, Text, StyleSheet, View } from 'react-native';
import { useLeftHanded } from '../../contexts/LeftHandedContext';
import { leftHandedSwitchStyles } from './LeftHandedSwitch.styles';

interface Props {
    onChange?: (value: boolean) => void;
}

export default function LeftHandedSwitch({ onChange }: Props) {
    const { leftHanded, setLeftHanded } = useLeftHanded();
    const switchOpacity = useRef(new Animated.Value(0.3)).current;

    const handleSwitchPress = async (value: boolean) => {
        setLeftHanded(value);
        if (onChange) onChange(value);
        Animated.sequence([
            Animated.timing(switchOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(switchOpacity, {
                toValue: 0.3,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Animated.View style={[leftHandedSwitchStyles.switchContainer, { opacity: switchOpacity }]}>
            <Text style={leftHandedSwitchStyles.switchLabel}>Modo canhoto</Text>
            <Switch
                value={leftHanded}
                onValueChange={handleSwitchPress}
                thumbColor={leftHanded ? '#6c00ff' : '#ccc'}
                trackColor={{ false: '#ccc', true: '#a3f7bf' }}
            />
        </Animated.View>
    );
}