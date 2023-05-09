import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TemperatureSwitcher = ({temperatureValueSwitch}) => {
    const [isCelsius, setIsCelsius] = useState(false);

    const toggleSwitch = () => {
        setIsCelsius(isCelsius => !isCelsius);
        temperatureValueSwitch(isCelsius);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isCelsius ? (
                    <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="white" />
            ) : (
                <MaterialCommunityIcons name="temperature-celsius" size={24} color="white" />
            )}
            <Switch
                trackColor={{false: 'rgba(215,58,35,1)', true: '#fff'}}
                thumbColor={isCelsius ? 'rgba(215,58,35,1)' : '#f4f3f4'}
                value={isCelsius}
                onValueChange={toggleSwitch}
            />
        </View>
    );
};

export default TemperatureSwitcher;