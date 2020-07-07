import React, {useState, useEffect, useReducer} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Input, Select, IndexPath, SelectItem } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import Post from '../../../axios/post';
const data = [
    'Jenis Kelamin',
    'Laki-laki',
    'Perempuan'
  ];
const dataValue = [
    'Jenis Kelamin',
    'L',
    'P'
  ];
function AnakPage(props) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const { navigation, disabled, ibu, dataanak, ubahDisabledTrue, anak, ubahAnak, ubahDataAnak } = props;
    const [show, setShow] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        onChangeValue('tgl_lahir', currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate());
      };
      const onPress = () => {
        if(dataanak === null){
            setError({
                error : true,
                message : 'Data Tidak Boleh Kosong'
            });
        } else {
            if(typeof dataanak.nama === 'undefined' || typeof dataanak.tgl_lahir === 'undefined' || typeof dataanak.usia_bulan === 'undefined' ||
               typeof dataanak.jenis_kelamin === 'undefined' || typeof dataanak.berat_badan_lahir === 'undefined' || typeof dataanak.panjang_badan_lahir === 'undefined' ){
                setError({
                    error : true,
                    message : 'Masih Ada Data Yang Kosong'
                }); 
            } else {
                if(typeof dataanak.nama !== 'string'){
                    setError({
                        error : true,
                        message : 'Nama Harus Berupa Karakter'
                    }); 
                } else if(isNaN(parseFloat(dataanak.berat_badan_lahir))){
                    setError({
                        error : true,
                        message : 'Berat Badan Harus Berupa Angka'
                    }); 
                } else if(Number.isInteger(dataanak.usia_bulan) !== true){
                    setError({
                        error : true,
                        message : 'Usia Harus Berupa Angka'
                    });
                } else if(Number.isInteger(dataanak.panjang_badan_lahir) !== true){
                    setError({
                        error : true,
                        message : 'Panjang Badan Harus Berupa Angka'
                    });
                } else {
                    ubahDataAnak({
                        ...dataanak,
                        ibu_id: Number(ibu.id)
                        })
                    setLoading(true);
                }
            }
        }
    }
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };
    const getValue = (input) => {
        if(dataanak !== null){
            if(typeof dataanak[input] !== 'undefined'){
                return dataanak[input].toString();
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
    const showDatepicker = () => {
        showMode('date');
      };
    const onChangeValue = (input, value) => {
         if(input !== 'jenis_kelamin'){    
           if(input === 'usia_bulan'){
            ubahDataAnak({
                    ...dataanak,
                    [input]: Number(value)
                })
           } else if(input === 'berat_badan_lahir'){
            ubahDataAnak({
                ...dataanak,
                [input]: Number(value)
            })
           } else if(input === 'panjang_badan_lahir'){
            ubahDataAnak({
                ...dataanak,
                [input]: Number(value)
            })
           } else {
            ubahDataAnak({
                ...dataanak,
                [input]: value
            })
            }
        } else  {
            ubahDataAnak({
                ...dataanak,
                [input]: dataValue[value.row]
            })
            setSelectedIndex(value);
        }
    }
    const onPressClose = () => {
        setError(null);
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
    const displayValue = data[selectedIndex.row];
    const getResponse = async () => {
        if(dataanak !== null && loading === true && getDisabled('anak') === false){
          const data = await Post('http://strongkids.devover.id/api/anak', dataanak);
          ubahAnak(data);
        }
    }
    const tanggalValue = () => {
        if(dataanak === null) {
            return(
                <Text style={{fontSize:16, color:'#8F9BB3'}}>Tanggal Lahir</Text>
            )
        } else {
            if(typeof dataanak.tgl_lahir !== 'undefined'){
                const dataDate = getValue('tgl_lahir');
                return(
                <Text style={{fontSize:16, color:'#8F9BB3'}}>{dataDate}</Text>
                )
            }
            return(
                <Text style={{fontSize:16, color:'#8F9BB3'}}>Tanggal Lahir</Text>
            )
        }
    }
    const getDisabled = (page) => {
        if(disabled === null){
            return false
        } else {
            if(typeof disabled[page] !== 'undefined'){
                return disabled[page].status
            }
            return false;
        }  
    }
    useEffect(() => {
        getResponse();
        if(anak !== null && loading === true){
            navigation.navigate('question',  {
                question_id: 0,
                category_id: 'PENGETAHUAN_IBU'
            });    
            ubahDisabledTrue('anak');
            setLoading(false);
        }
    })
    if(loading === true){  
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        )
    } else {
        return (
        <ScrollView style={{backgroundColor: '#fff', padding: 20}}>
            <View style={{height:50, marginBottom:10,justifyContent:'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Identitas Anak</Text>
            <View style={{backgroundColor:'#000', height: 4, width: 50, borderRadius: 2}}></View>
            </View>
            {getMessageError()}
            <View style={{ height:350, marginBottom:10, justifyContent:'space-evenly'}}>
            <Input disabled={getDisabled('anak')} onChangeText={(value) => onChangeValue('nama', value)}
                placeholder='Nama'
                />
            <TouchableOpacity disabled={getDisabled('anak')} style={{ width:'100%', backgroundColor:'#F7F9FC', height:42, borderColor:'#EDF1F7', borderRadius:5, borderWidth:1.5, justifyContent:'center', paddingHorizontal:20}} onPress={showDatepicker}>
            {tanggalValue()}
            </TouchableOpacity>
            {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
        )}
            <Input keyboardType="number-pad" disabled={getDisabled('anak')} value={getValue('usia_bulan')} onChangeText={(value) => onChangeValue('usia_bulan', value)}
                placeholder='Usia (Bulan)'
                />
            <Select disabled={getDisabled('anak')} value={displayValue} selectedIndex={selectedIndex} onSelect={(index) => onChangeValue('jenis_kelamin', index)} placeholder="Jenis Kelamin">
                {data.map((item, index) => (
                    <SelectItem key={index} title={item}/>
                ))}
            </Select>
            <Input keyboardType="number-pad" disabled={getDisabled('anak')} value={getValue('berat_badan_lahir')} onChangeText={(value) => onChangeValue('berat_badan_lahir', value)}
                placeholder='Berat Lahir'
                />
            <Input keyboardType="number-pad" disabled={getDisabled('anak')} value={getValue('panjang_badan_lahir')} onChangeText={(value) => onChangeValue('panjang_badan_lahir', value)}
                placeholder='Panjang Lahir'
                />
            </View>
            <View style={{height:80, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 16}}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress()}>
                    <Text style={{fontSize: 16}}>Next</Text>
                </TouchableOpacity>
            </View>
    </ScrollView> 
        )
    }
}
const MapStateToProps = (state) => {
    return {
        ibu :  state.Ibu,
        anak : state.Anak,
        dataanak: state.DataAnak,
        disabled: state.Disabled
    }
}
const MapDispatchToProps = (dispatch) => {
    return {
        ubahAnak : (value) => dispatch({type:'add', payload: value}),
        ubahDisabledTrue: (value) => dispatch({type:'true', payload:value}),
        ubahDisabledFalse: (value) => dispatch({type:'false', payload:value}),
        ubahDataAnak: (value) => dispatch({type:'add', payload: value})
    }
}
export default connect(MapStateToProps, MapDispatchToProps)(AnakPage)