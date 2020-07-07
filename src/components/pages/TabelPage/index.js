import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Button } from '@ui-kitten/components';
const TabelPage = (props) => {
    const {navigation, route} = props;
    const { result_id } = route.params
    return (
        <View style={{flex:1}}>
            <WebView
             source={{
                uri: 'http://strongkids.devover.id/standar-berat/'+ result_id
              }}
            />
            <Button style={{position:'absolute', bottom:0, left: 0, margin: 10}} onPress={() => navigation.navigate('question', {
                category_id : 'SKRINING_GIZI',
                question_id : 3,
                image_id : null
            })}>Back To Question</Button>
        </View>
    )
}

export default TabelPage;