import {View, Text, FlatList, ScrollView, StyleSheet} from 'react-native';
import ListItem from "./ListItem";

const Separator = () => {
    return <View style={{ height: 1, backgroundColor: 'white' }} />;
};
const Lists = ({days, formatDateString, icons}) => {
    return (
            <ScrollView style={styles.List}>
                <FlatList
                    ItemSeparatorComponent={Separator}
                    data={days}
                    renderItem={({item}) => <ListItem item={item} formatDateString={formatDateString} icons={icons}/>}
                    keyExtractor={item => item.id}
                    horizontal={false}
                />
            </ScrollView>

    );
}

const styles = StyleSheet.create({
    List: {
        marginTop: 15,
        marginBottom: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'rgba(215,58,35,0.5)',
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white',
        marginLeft: 20,
    }
})

export default Lists;