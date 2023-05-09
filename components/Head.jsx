import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TemperatureSwitcher from "./TemperatureSwitcher";
const Head = ({drawer, temperatureValueSwitch}) => {
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
                <MaterialIcons style={{marginLeft:15,}} name="menu" size={24} color="white" />
            </TouchableOpacity>
            <TemperatureSwitcher temperatureValueSwitch={temperatureValueSwitch} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default Head;