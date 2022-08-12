import React, { useState } from "react";
import {
    Text, 
    View, 
    StyleSheet, 
    TextInput,
    SafeAreaView,
    ToastAndroid,
    Platform,
    AlertIOS
} from 'react-native';

const API_KEY = {
    key: '85ffa1c9e99c109d3209610d83799428' //open weather key
}
const BASE_URL= "https://api.openweathermap.org"
const lang = "es"
const units = "metric" // metric for Celcius, imperial for Fahrenheit and empty for Kelvin


const Home = () => {

    const [nameCity, setNameCity] = useState('');
    const [countryCity, setCountryCity] = useState('');
    const [tempText, setTempText] = useState('');
    const [descText, setDescText] = useState('');
    const [minTempText, setMinTempText] = useState('');
    const [maxTempText, setMaxTempText] = useState('');
    const [windText, setWindText] = useState('');
    const [humdText, setHumdText] = useState('');
    return ( 
        <SafeAreaView style={styles.container}>
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
           <View>
               <Text style={styles.tempStyle}>{`${Math.round(tempText)}°`}</Text>
               <Text style={styles.descStyle}>{descText}</Text>
               <Text style={styles.dateStyle}>{new Date().toLocaleString('es')}</Text>
               <View style = {styles.lineStyle}/>
           </View>
           
           <View style = {{flexDirection: 'row', justifyContent:'space-around'}}>
           <Text style={styles.minMaxStyle}>{`Min: ${Math.round(minTempText)} °C`}</Text>
           <Text style={styles.minMaxStyle}>{`Max: ${Math.round(maxTempText)} °C`}</Text>
           </View>
           <View style = {{flexDirection: 'row', justifyContent:'space-around'}}>
           <Text style={styles.minMaxStyle}>{`Viento: ${windText} km/h`}</Text>
           <Text style={styles.minMaxStyle}>{`Humedad: ${humdText} %`}</Text>
           </View>
           
       </View>
        </SafeAreaView>
    );

    async function requestWeatherData(city){
        const data = await fetch(`${BASE_URL}/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY.key}`)
        .then(res => res.json()).catch(function(error) {
            showToastMessage("No ha sido posible conectarse, intente más tarde.");
              throw error;
            });
        if(data['cod']!=404){
          setNameCity(data['name']);
          setCountryCity(data['sys']['country']);
          setTempText(data['main'] ['temp']);
          setDescText(data['weather'][0]['description']);
          setMinTempText(data['main']['temp_min']);
          setMaxTempText(data['main']['temp_max']);
          setWindText(data['wind']['speed']);
          setHumdText(data['main']['humidity']);
        
          //data debuger
          console.log(data);
          console.log("API KEY: "+API_KEY.key);
          console.log(descText);
          console.log(minTempText);
          console.log(maxTempText);
        }else{
          showToastMessage("Lo sentimos, la ciudad introducida no existe.");
        }
    }

    function showToastMessage(message){
      if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.SHORT)
      } else {
          AlertIOS.alert(message);
      }
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
        margin: 10,
    },
    tempStyle: {
        color: '#FFFFFF',
        fontSize: 200,
        alignSelf: 'center',
        fontWeight: '400',

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
        margin: 20,
    },
});
export default Home;