import React from "react";
import {
    Text, 
    View, 
    StyleSheet, 
    TextInput, 
    ToastAndroid,
    Platform,
    AlertIOS,
    Image
} from 'react-native';

const API_KEY = {
    key: '85ffa1c9e99c109d3209610d83799428' //open weather key
}
const BASE_URL= "https://api.openweathermap.org"
const lang = "es"
const units = "metric" // metric for Celcius, imperial for Fahrenheit and empty for Kelvin

var mainIcon = "01d"

const Home = () => {
    
    return (
        <View style = {styles.container}>
            <View>
                {/*TODO: Nombre de la cuidad*/}
                <Text>hola que hace</Text>
            </View>
            <View>
                {/*TODO: Imagen*/}
            </View>
            <View>
                {/*TODO: Datos*/}
            </View>
            <View>
                <TextInput
                placeholder = "Ingresa el nombre de la cuidad"
                style = {styles.textInput}
                onSubmitEditing = {(event) => {
                    requestWeatherData(event.nativeEvent.text);
                }} />
            </View>
            <Image
                style={styles.mainImageStyle}
                source={{
                    uri: `${BASE_URL}/img/w/${mainIcon}.png`,
                }}
            />
        </View>
    );

};
async function requestWeatherData(city){
    const data = await fetch(`${BASE_URL}/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY.key}`)
    .then(res => res.json());

    //data
    console.log(data);
    console.log("API KEY: "+API_KEY.key);

    // toast just for testing
    if (Platform.OS === 'android') {
        ToastAndroid.show(`${data['main']['temp']}`, ToastAndroid.SHORT)
      } else {
        AlertIOS.alert(city);
      }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12232E",
    },

    textInput: {
        padding: 10,
        paddingVertical: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontSize: 20,
        borderRadius: 25,
        justifyContent: 'center'
    },

    mainImageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
      },
});
export default Home; 