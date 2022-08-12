import React, { useState } from "react";
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


const Home = () => {

    const [nameCity, setNameCity] = useState([]);
    const [countryCity, setCountryCity] = useState([]);
    const [tempText, setTempText] = useState([]);
    const [descText, setDescText] = useState([]);
    const [minTempText, setMinTempText] = useState([]);
    const [maxTempText, setMaxTempText] = useState([]);

    return ( 
        <View style = {styles.container}>
           
            <View>
                <TextInput
                placeholder = "Ingresa el nombre de la cuidad"
                style = {styles.textInput}
                onSubmitEditing = {(event) => {
                    requestWeatherData(event.nativeEvent.text);
                }} />
            </View>
            <View>
             <Text style={styles.cityCountyStyle}>{nameCity}, {countryCity}</Text>
           </View>
           <Image 
            style={styles.mainImageStyle}
            source={require("../assets/images/despejado_dia.png")}/>

            <View>
                <Text style={styles.tempStyle}>{`${Math.round(tempText)} °C`}</Text>
                <Text style={styles.descStyle}>{descText}No sale descripcion</Text>{/*AQUI DEBERIA MOSTRAR LA DESCRIPCION OBTENIDA DEL DATA */}
                <Text style={styles.dateStyle}>{new Date().toLocaleString()}</Text>
                <View style = {styles.lineStyle}/>
            </View>
            
            <View style = {{flexDirection: 'row', justifyContent:'space-around'}}>
            <Text style={styles.minMaxStyle}>{`Min: ${Math.round(minTempText)} °C`}</Text>
            <Text style={styles.minMaxStyle}>{`Max: ${Math.round(maxTempText)} °C`}</Text>
            </View>
            
        </View>
    );

    async function requestWeatherData(city){
        const data = await fetch(`${BASE_URL}/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY.key}`)
        .then(res => res.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });
            setNameCity(data['name']);
            setCountryCity(data['sys']['country']);
            setTempText(data['main'] ['temp']);
            setDescText(data['weather']['icon']);//AQUI ME SALE ERROR DICE "undefined"
            setMinTempText(data['main']['temp_min']);
            setMaxTempText(data['main']['temp_max']);
        //data debuger
        console.log(data);
        console.log("API KEY: "+API_KEY.key);
        console.log(descText);
        console.log(minTempText);
        console.log(maxTempText);    
    }

};



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
        width: 250,
        height: 250,
        alignSelf: 'center'      
    },

    cityCountyStyle: {
        color: '#FFFFFF',
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    tempStyle: {
        color: '#FFFFFF',
        fontSize: 100,
        alignSelf: 'center',
        fontWeight: 'bold',

    },
    descStyle: {
        color: '#FFF',
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    dateStyle: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 15,
        alignSelf: 'center',
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#FFF',
        margin: 20,
    },
    minMaxStyle:{
        color: '#FFF',
        fontSize: 20,
    },
});
export default Home; 