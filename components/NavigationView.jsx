import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import AutoComplete from 'react-native-autocomplete-input';
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {useState,useEffect} from 'react';
const NavigationView = ({drawer, city, editCity, currentMetric}) => {
    const [text, setText] = useState(city);
    const [citiesData, setCitiesData] = useState();
    const isLoading = !citiesData || !citiesData.length;
    const onChange = async (textVal) => {
        setText(textVal);
        const data = await getCities(textVal);
        setCitiesData(data);
    };
    const handleButtonClick = () => {
        editCity(text)
        drawer.current.closeDrawer()
    }
    const getCities = async (text) => {
        const API_URL = `https://api.teleport.org/api/cities/?search=${text}&limit=3`;
        const response = await fetch(API_URL);
        const data = await response.json();
        const cities = data._embedded['city:search-results'].map((item) => {
            console.log('this is item from cities', item.matching_full_name[0])
            return item.matching_full_name
        });
        return cities;
    };
    useEffect(() => {
        const getCitiValues = async () => {
            const result = await getCities(text)
            setCitiesData(result)
        }
        getCitiValues()

    },[])
    console.log('citiesData',citiesData)
    return(
        <View style={styles.navigationContainer}>

            <View style={styles.header}>

                    {currentMetric ? (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="temperature-celsius" size={24} color="black" />
                            <Text style={styles.paragraph}>Celsius</Text>
                        </View>

                    ) : (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="black" />
                            <Text style={styles.paragraph}>Fahrenheit</Text>
                        </View>

                    )}

                <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
                    <MaterialIcons style={{marginRight:15,}} name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.cityEditArea}>
                <View style={styles.autocompleteContainer}>
                    {citiesData && (
                        <AutoComplete
                            editable={!isLoading}
                            autoCorrect={false}
                            data={citiesData}
                            defaultValue={city}
                            value={text}
                            onChangeText={onChange}
                            flatListProps={{
                                keyboardShouldPersistTaps: 'always',
                                keyExtractor: (item) => item.id,
                                renderItem: ({ item }) => (
                                    <TouchableOpacity onPress={handleButtonClick}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                        />
                        // <AutoComplete
                        //     data={citiesData}
                        //     hideResults={false}
                        //     defaultValue={city}
                        //     value={text}
                        //     onChangeText={onChange}
                        //     flatListProps={{
                        //         keyExtractor: (_, idx) => idx,
                        //         renderItem: ({ item }) => (
                        //             <TouchableOpacity onPress={() => setText(item)}>
                        //                 <Text>{item}</Text>
                        //             </TouchableOpacity>
                        //         ),
                        //     }}
                        // />
                    )}
                </View>

                {/*<TouchableOpacity style={styles.buttonStyle} onPress={handleButtonClick}>*/}
                {/*    <Text>Save</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TextInput style={styles.input} value={text} onChangeText={onChange} />*/}
                {/*<TouchableOpacity style={styles.buttonStyle} onPress={handleButtonClick}>*/}
                {/*    <Text >Save</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    navigationContainer: {
        flex: 1,
        padding: 16,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'white',
    },
    header: {
        marginTop:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
    cityEditArea:{
        position: 'relative',
        flexDirection: 'row',
        marginTop: 15,
    },
    input:{
        flex:1,
        borderColorColor: 'tomato',
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        paddingLeft: 15,
    },
    buttonStyle: {
        borderColorColor: 'tomato',
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        color: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        padding: 5,
    },
})
export default NavigationView;