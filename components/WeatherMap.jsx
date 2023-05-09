import {View, Image, Text} from 'react-native';
import {useState, useEffect} from "react";

const WeatherMap = ({layer, zoom, x, y, apiKey}) => {
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {

        const url = `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${apiKey}`;
        setMapUrl(url);
    }, [x, y, zoom, apiKey]);
    console.log('mapImage', mapUrl)
    return(
        <View>
            { mapUrl && (
                <Image
                    source={{ uri: mapUrl }}
                    style={{
                        width: "100%",
                        height: 300,
                        resizeMode: 'contain',
                    }}
                />
            )}
        </View>
    )
}

export default WeatherMap;