import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, ActivityIndicator
} from 'react-native';
import { Button } from '@ui-kitten/components';
const image = require('../../assets/image/undraw_done.png');
const FinishPage = (props) => {
    const {navigation} = props;    
    const [loading, setLoading] = useState(true);
    const onPressEdukasi = () => {
        navigation.navigate('edukasi')
    }
    const onPressScore = () => {
        navigation.navigate('score')
    }
    useEffect(() => {
        setTimeout(() => {
        if(loading === true){
        setLoading(false);
        }
        }, 2000)
    })
    if(loading === true){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        )
    }
    return (
       <View style={{flex: 1, backgroundColor: '#fff', justifyContent: "space-around", padding: 20}}>
            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
               <Image style={{resizeMode: 'cover', height: 250, width: 250}} source={image}/>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
               <Text style={{fontSize: 16, fontWeight:'400', textAlign:'center'}}>Silahkan
Lihat Score Untuk Status Gizi Anak Anda.</Text>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button onPress={() => onPressScore()} style={{height: 50}} appearance="outline" status="primary">Lihat Score</Button>
                <Button onPress = {() => onPressEdukasi()} style={{height: 50}} appearance="outline" status="primary">Lihat Edukasi Gizi Kurang</Button>
            </View>
       </View> 
    )
}

export default FinishPage