import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Dimensions,
    ActivityIndicator,
    Image, DrawerLayoutAndroid
} from 'react-native';
import {useEffect, useState, useRef} from "react";
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import Lists from './components/List/Lists';
import Head  from "./components/Head";
import NavigationView from "./components/NavigationView";
import WeatherMap from "./components/WeatherMap";

const { height, width: SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = 'eb3186fda0c8e3b6f1d876e3775908f2';
const icons = {
    Clouds: 'cloudy',
    Clear: 'day-sunny',
    Atmosphere: 'cloudy-gusts',
    Snow: 'snow',
    Rain: 'rains',
    Drizzle: 'rain',
    Thunderstorm: 'lightning'
}
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const formatDateString = (date_string, options) => {
    const date = new Date(date_string);

    return date.toLocaleDateString('en-US', options);
}
export default function App() {
    const [city, setCity] = useState('');
    const [ok, setOk] = useState(true);
    const [days, setDays] = useState([]);
    const [directions, setDirections] = useState({});
    const [currentMetric, setMetric] = useState(true);
    const drawer = useRef(null);
    const ask = async() => {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (!permission.granted) {
            setOk(false);
        }
        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
        setDirections({latitude, longitude})
        const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})
        setCity(location[0].city)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        const result = await response.json();

        setDays(
            result.list.filter((weather) => {
                if (weather.dt_txt.includes("00:00:00")) {
                    return weather;
                }
            })
        );

    }
    const editCity = async (address) => {
        try {
            const locationCoords = await Location.geocodeAsync(address, {useGoogleMaps: false});
            if (!locationCoords) {
                console.log('Unable to find location for address:', address);
                return;
            }
            const {latitude, longitude} = locationCoords[0];

             const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})
             console.log(location[0].city, 'this is cityName')
             setDirections({latitude, longitude})
             setCity(location[0].city)
             const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`)
             const result = await response.json();
            setDays(
                result.list.filter((weather) => {
                    if (weather.dt_txt.includes("00:00:00")) {
                        return weather;
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    }
    const temperatureValueSwitch = async (isCelsius) => {
        const unit = isCelsius ? 'metric' : 'imperial';
        console.log('isCelsius', isCelsius);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${directions.latitude}&lon=${directions.longitude}&appid=${API_KEY}&units=${unit}`);
        const result = await response.json();
        setMetric(isCelsius => !isCelsius);
        setDays(
            result.list.filter((weather) => {
                if (weather.dt_txt.includes("00:00:00")) {
                    return weather;
                }
            })
        );
    }

    useEffect(() => {
        ask();
    },[])

    const navigationView = (
        <NavigationView drawer={drawer} city={city} editCity={editCity} currentMetric={currentMetric}/>
    );

  return (

      ok === true ? (
              <DrawerLayoutAndroid
                  ref={drawer}
                  drawerWidth={300}
                  renderNavigationView={() => navigationView}
                  drawerBackgroundColor={'rgba(256,256,256,.0)'}
                  style={styles.drawerContainer}>
                  <SafeAreaView style={styles.container} >
                        <ScrollView>
                            <Head drawer={drawer} temperatureValueSwitch={temperatureValueSwitch}/>

                             <View style={styles.city}>
                                 <View style={{
                                     flexDirection: 'row-reverse',
                                     alignItems: 'center',
                                 }}>
                                     <Text style={styles.cityName}>{city}</Text>
                                     <Fontisto name="map-marker-alt" size={24} color="white" />
                                 </View>

                             </View>


                          <ScrollView
                              contentContainerStyle={styles.weather}
                              horizontal
                              pagingEnabled
                          >
                              {
                                  days.length === 0 ? (
                                          <View style={styles.day}>
                                              <ActivityIndicator size={"large"} color={'white'}/>
                                          </View>
                                      )
                                      : (
                                          days.map((day, index) => (
                                              <View key={index} style={styles.day}>

                                                  <View style={{
                                                      flexDirection: "row",
                                                      alignItems: 'center',
                                                      justifyContent: 'space-around'
                                                  }}>
                                                      <View>
                                                          <Fontisto name={icons[day.weather[0].main]} size={48} color={'white'} />
                                                          <Text style={{color: 'white'}}>{formatDateString(day.dt_txt, options)}</Text>
                                                      </View>

                                                      <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}°</Text>
                                                  </View>
                                                  <View style={{
                                                      flexDirection: "column",
                                                      justifyContent: 'flex-start',
                                                      alignItems: 'flex-start',
                                                      marginLeft: "5%",
                                                  }}>

                                                      <Text style={styles.description}>{day.weather[0].main}</Text>
                                                      <Text style={styles.tinyText}>{day.weather[0].description}</Text>

                                                  </View>

                                              </View>
                                          ))

                                      )
                              }

                          </ScrollView>

                          <Lists icons={icons} days={days} formatDateString={formatDateString}/>
                            <Lists icons={icons} days={days} formatDateString={formatDateString}/>

                      </ScrollView>

                          {/*<WeatherMap layer="temp_new" zoom={10} x={74} y={40} apiKey={API_KEY} />*/}


                  </SafeAreaView>
              </DrawerLayoutAndroid>

      ) : (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontSize: 16}}>
                Please Approve your Geolocation Permissions
            </Text>
            <Image style={styles.img} source={require('./assets/undraw_feeling_blue_4b7q.png')}  />
        </View>
      )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  img: {
      width: SCREEN_WIDTH,
      height: 300,
      resizeMode: 'contain',
  },
  text: {
    fontSize: 28
  },
  city: {

      paddingBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 4,
      borderColor: '#fff',
  },
  cityName: {
      color: '#fff',
      fontSize: 33,
      fontWeight: "700",
      marginLeft: 10,
  },
  weather: {

  },
  day: {
      width: SCREEN_WIDTH,
      flexDirection: 'column',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      backgroundColor: 'rgba(215,58,35,0.5)',
      marginBottom:10,
      marginTop:10,
      padding:20,
  },
  temp: {
    color: '#fff',
    fontSize: 88,
    fontWeight: "700",
  },
  description: {
    color: '#fff',
    fontSize: 38,
    fontWeight: "700",
  },
  tinyText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: "300",
  },
    drawerContainer: {
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }

});
