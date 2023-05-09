import {View, Text, StyleSheet } from 'react-native';
import {Fontisto} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const options = {
    month: 'long',
    day: 'numeric',
};
const ListItem = ({formatDateString, icons, item}) => {
    return(
        <View style={styles.ListItem}>
            <Text style={{color: 'white', fontSize: 16}}>{formatDateString(item.dt_txt, options)}</Text>
            <View>
                <Fontisto name={icons[item.weather[0].main]} size={38} color={'white'} />
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
            }}>
                <Text style={styles.humidity}>
                    <MaterialCommunityIcons name="water" size={24} color="white" />
                </Text>
                <Text style={styles.humidity}>
                    {parseFloat(item.main.humidity).toFixed(1)}%
                </Text>
            </View>

            <Text style={styles.temp}>{parseFloat(item.main.temp).toFixed(1)}°</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ListItem: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    humidity: {
        color: '#fff',
        fontSize: 22,
        fontWeight: "400",
    },
    temp: {
        color: '#fff',
        fontSize: 28,
        fontWeight: "700",
    },

})
export default ListItem;