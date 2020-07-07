import React, { useState, useReducer, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { Input, IndexPath, Select , SelectItem } from '@ui-kitten/components';
import Post from '../../../axios/post';
import connect from 'react-redux/lib/connect/connect';
const data = [
    'Pendidikan Terakhir',
    'SD',
    'SMP',
    'SMA/K',
    'KULIAH'
  ];
const dataValue = [
    'Pendidikan Terakhir',
    'SD',
    'SMP',
    'SMA',
    'KULIAH'
];
function OrtuPage(props) {
    const [error, setError] = useState(null);
    const { navigation, ibu, dataibu, disabled, ubahIbu, ubahDataIbu, ubahDisabledTrue, ubahDisabledFalse } = props;
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const onPress = () => {
        if(dataibu === null){
            setError({
                error : true,
                message : 'Data Tidak Boleh Kosong'
            });
        } else {
            if(typeof dataibu.nama === 'undefined' || typeof dataibu.pendidikan_terakhir === 'undefined' || typeof dataibu.pendapatan_keluarga === 'undefined'){
                setError({
                    error : true,
                    message : 'Masih Ada Data Yang Kosong'
                }); 
            } else {
                if(typeof dataibu.nama !== 'string'){
                    setError({
                        error : true,
                        message : 'Nama Harus Berupa Karakter'
                    }); 
                } else if(typeof dataibu.pendidikan_terakhir !== 'string'){
                    setError({
                        error : true,
                        message : 'Nama Harus Berupa Karakter'
                    }); 
                } else if(Number.isInteger(dataibu.pendapatan_keluarga) !== true){
                    setError({
                        error : true,
                        message : 'Pendapatan Harus Berupa Angka'
                    });
                } else {
                    setLoading(true);
                }
            }
        }
    }
    const onPressClose = () => {
        setError(null);
    }
    const getValue = (input) => {
        if(input === 'nama'){
            if(dataibu !== null){
                if(typeof dataibu.nama !== 'undefined'){
                    return dataibu.nama
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else if(input === 'pendapatan_keluarga'){
            if(dataibu !== null){
                if(typeof dataibu.pendapatan_keluarga !== 'undefined'){
                    return dataibu.pendapatan_keluarga.toString()
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }
    }
    const displayValue = data[selectedIndex.row];
    const onChangenama = (value) => {
        ubahDataIbu({
            ...dataibu,
            nama: value
            });
    }
    const onChangependidikan = (value) => {
        ubahDataIbu({
            ...dataibu,
            pendidikan_terakhir: dataValue[value.row]
        });
        setSelectedIndex(value);
    }
    const onChangependapatan = (value) => {
        ubahDataIbu({
            ...dataibu,
            pendapatan_keluarga: Number(value)
        });
    }
    const getResponse = async () => {
        if(dataibu !== null && loading === true && getDisabled('ortu') === false){
          const data = await Post('http://strongkids.devover.id/api/ibu', dataibu);
          ubahIbu(data.data);
        } else {
            return false;
        }
    }
    
    useEffect(() => {
        getResponse();
        if(ibu !== null && loading === true){
            navigation.navigate('anak');
            setLoading(false);
            ubahDisabledTrue('ortu');
        }
    })
    const getDisabled = (page) => {
        if(disabled === null){
          return false
        } else {
            if(typeof disabled[page].status !== 'undefined'){
                return disabled[page].status
            } else {
                return false;
            }
        }
    }
    const getMessageError = () => {
        if(error !== null){
            return(
            <View style={{height:50, borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>
                <Text style={{fontSize:15, color:'#fff', fontWeight:'700'}}>{error.message}</Text>
                <TouchableOpacity onPress={() => onPressClose()} style={{position:'absolute', top:0, right:10}}><Text style={{color:'#fff', fontWeight:'bold'}}>x</Text></TouchableOpacity>
            </View>
            )
        }
    }
    if(loading === true){  
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        )
    } else {
        return (
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent: "space-around", padding: 20}}>
            <KeyboardAvoidingView behavior="padding">
            <View style={{height:50, marginVertical:10, justifyContent:'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Identitas Ibu</Text>
            <View style={{backgroundColor:'#000', height: 4, width: 50, borderRadius: 2}}></View>
            </View>
            {getMessageError()}
                <View style={{ height: 200, justifyContent:'center'}}>
                <Input disabled={getDisabled('ortu')} value={getValue('nama')} style={{marginBottom:5}} onChangeText={(value) => onChangenama(value)}
                    placeholder='Nama'
                    />
                <Select disabled={getDisabled('ortu')} value={displayValue} selectedIndex={selectedIndex} onSelect={(index) => onChangependidikan(index)} style={{marginBottom:5}}>
                    {data.map((item, index) => ( 
                        <SelectItem key={index} title={item}/>
                    ))}            
                </Select>
                <Input disabled={getDisabled('ortu')} value={getValue('pendapatan_keluarga')} keyboardType="number-pad" onChangeText={(value) => onChangependapatan(value)} style={{marginTop:5}}
                    placeholder='Pendapatan Keluarga'
                    />
                </View>
            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 16}}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress()}>
                    <Text style={{fontSize: 16}}>Next</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
    </View> 
        )
    }
}
const MapStateToProps = (state) => {
    return {
        ibu : state.Ibu,
        dataibu: state.DataIbu,
        disabled: state.Disabled,
    }
}

const MapDispatchToProps = (dispatch) => {      
    return{
        ubahIbu : (value) =>  dispatch({type:'add', payload: value}),
        ubahDataIbu : (value) =>  dispatch({type:'add', payload: value}),
        ubahDisabledTrue : (value) => dispatch({type:'true', payload: value}),
        ubahDisabledFalse : (value) => dispatch({type:'false', payload:value})
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(OrtuPage) 