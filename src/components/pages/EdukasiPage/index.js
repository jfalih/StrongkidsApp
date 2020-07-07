import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Button } from '@ui-kitten/components';
const EdukasiPage = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <WebView
             source={{
                uri: 'http://strongkids.devover.id/edukasi'
              }}
            />
            <Button style={{position:'absolute', bottom:0, left: 0, margin: 10}} onPress={() => navigation.goBack()}>Back To Finish Page</Button>
        </View>
    )
}

export default EdukasiPage;