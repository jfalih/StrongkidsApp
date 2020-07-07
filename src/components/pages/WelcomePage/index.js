import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, ActivityIndicator
} from 'react-native';
import { Button } from '@ui-kitten/components';
import Get from '../../../axios/get';
const image = require('../../assets/image/Frame.png');
function WelcomePage(props) {
    const [informasi, setInformasi] = useState(null);
    const {navigation} = props;
    const getResponse = async() => {
        const data = await Get('http://strongkids.devover.id/api/informasi');
        setInformasi(data.data)
    }
    const onPressScore = () => {
        navigation.navigate('score')
    }
    const onPressOrtu = () => {
        navigation.navigate('ortu')
    }
    useEffect(() => {
    if(informasi === null){
        getResponse()
        }  
    })
    if(informasi === null){
        return(<View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
        <ActivityIndicator size="large" color="#000"/>
    </View>)
    } else {  
    return (
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent: "space-around", padding: 20}}>
             <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                <Image style={{resizeMode: 'cover', height: 250, width: 250}} source={image}/>
             </View>
             <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 20, fontWeight:'400', textAlign:'center'}}>{informasi.value}</Text>
             </View>
             <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                 <Button style={{height: 50}} appearance="outline" onPress={() => navigation.navigate('ortu')} status="primary">Pendaftaran</Button>
                 <Button style={{height: 50}} appearance="outline" onPress={() => onPressScore()} status="primary">Lihat Score</Button>
             </View>
        </View> 
     )
    }
}

export default WelcomePage