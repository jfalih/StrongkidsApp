import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, ActivityIndicator
} from 'react-native';
import { Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
const ScorePage = (props) => {
    const {score, navigation} = props;
    const [color, setColor] = useState('#000');
    const [loading, setLoading] = useState(true);
    const cekScore = () => {
        if(score <= 3 && score > 0){
            setColor('#fcba03');
        } else if(score >= 4) {
            setColor('#9e0000');
        } else if(score === 0){
            setColor('#065400');
        }
    }
    const textElement = () => {
        if(score <= 3 && score > 0){
            return "BERESIKO SEDANG GIZI KURANG";
        } else if(score >= 4){
            return "BERESIKO TINGGI GIZI KURANG";
        } else if(score === 0){
            return "TIDAK BERESIKO GIZI KURANG";
        }
    }
    const anjuranElement = () => {
        if(score <= 3 && score > 0){
            return "Segera periksakan kepelayanan kesehatan terdekat dan konsulkan dengan ahli gizi";
        } else if(score >= 4){
            return "Segera periksakan kepelayanan kesehatan terdekat dan konsulkan dengan ahli gizi";
        } else if(score === 0){
            return "Gizi anda tidak beresiko gizi kurang, jaga selalu pola gizi anda serta konsulkan dengan ahli gizi";
        }
    }
    useEffect(() => {
    setTimeout(() => {
    setLoading(false);
    cekScore();
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
       <View style={{flex: 1, backgroundColor: '#fff', justifyContent: "space-between", padding: 20}}>           
            <View style={{flex:3, justifyContent:'space-around', alignItems:'center'}}>
               <Text style={{fontSize: 20, fontWeight:'400', textAlign:'center'}}>Score</Text>
               <Text style={{fontSize: 100, color:color, fontWeight:'bold', textAlign:'center'}}>{score}</Text>
               <Text style={{fontSize: 20, color:color, fontWeight:'400', textAlign:'center'}}>{textElement()}</Text>
               <Text style={{fontSize: 20, color:color, fontWeight:'400', textAlign:'center'}}>Anjuran:</Text>
               <Text style={{fontSize: 16, color:color, fontWeight:'400', textAlign:'center'}}>{anjuranElement()}</Text> 
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button onPress={() => navigation.goBack()} style={{height: 50}} appearance="outline" status="primary">Back</Button>
                <Button onPress={() => navigation.navigate('home')} style={{height: 50}} appearance="outline" status="primary">Go Home</Button>
            </View>
       </View> 
    )
}
const mapStateToProps = (state) => {
    return {
        score : state.Score
    }
}
export default connect(mapStateToProps, null)(ScorePage)