import React, { useState, useEffect, useReducer } from 'react';
import { ScrollView, Text, View, ActivityIndicator, FlatList, Image} from 'react-native';
import Get from '../../../axios/get';
import { QuestionReducer, questionState } from '../../../redux/QuestionRedux';
import { Button, ButtonGroup } from '@ui-kitten/components';
import { AnswerRedux, answerState } from '../../../redux/AnswerRedux';
import { connect } from 'react-redux';
import Post from '../../../axios/post';
import illustration from './illustration';
import { TouchableOpacity } from 'react-native-gesture-handler';

const QuestionPage = (props) => {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selesai, setSelesai] = useState(false);
    const [loadingBaru, setLoadingBaru] = useState(false);
    const { route, navigation, anak, ubahScore,Statescore, updateAnswer, ubahNullAnswer, answer, ubahAnswer, Stateresult, ubahResult } = props;
    const { question_id, category_id, image_id } = route.params; 
    const image = [{
        id : 0,
        source : require('../../assets/image/step1-makan.jpg')
    },{
        id : 1,
        source : require('../../assets/image/step2-makan.jpg')
    },{
        id : 2,
        source : require('../../assets/image/step3-makan.jpg')
    },{
        id : 3,
        source : require('../../assets/image/step4-makan.jpg')
    },{
        id : 4,
        source : require('../../assets/image/step5-makan.jpg')
    },{
        id : 5,
        source : require('../../assets/image/step6-makan.jpg')
    },{
        id : 6,
        source : require('../../assets/image/step7-makan.jpg')
    },{
        id : 7,
        source : require('../../assets/image/step8-makan.jpg')
    },{
        id : 8,
        source : require('../../assets/image/step9-makan.jpg')
    },{
        id : 9,
        source : require('../../assets/image/step10-makan.jpg')
    }
    ];
    const image1 = [{
        id : 0,
        source : require('../../assets/image/step1-klinis.jpg')
    },{
        id: 1,
        source: require('../../assets/image/step2-klinis.jpg')
    },{
        id: 2,
        source: require('../../assets/image/step3-klinis.jpg')
    }];
    const image2 = [{
        id: 0,
        source: require('../../assets/image/step1-resiko.jpg')
    }];
    const getImage = (id) => {
        for(let i = 0; i < illustration.length; i++ ){
            if(id === illustration[i].question_id){
                return(
                    <Image style={{resizeMode: 'cover', alignSelf:'center', height: 200, width: 200}} source={illustration[i].source}/>
                )
            }
        }
    }
    const getResponse = async () => {
            if(category_id === "SKRINING_GIZI"){
            const dataSkrining = await Get('http://strongkids.devover.id/api/question?category=SKRINING_GIZI');
            setQuestion(dataSkrining.data);
            setLoading(false);
            } else if(category_id === "PENGETAHUAN_IBU"){
            const dataIbu = await Get('http://strongkids.devover.id/api/question?category=PENGETAHUAN_IBU');
            setQuestion(dataIbu.data);
            setLoading(false);
            } else if(category_id === "PERILAKU_ANAK"){
            const dataAnak = await Get('http://strongkids.devover.id/api/question?category=PERILAKU_ANAK');
            setQuestion(dataAnak.data);
            setLoading(false);
            }
    }
    const postResponse = async () => {
        if(selesai === true ){
            const data = await Post('http://strongkids.devover.id/api/answer', answer);
            ubahResult(data);
        }
    }
    useEffect(() => {
        if(loading === true){
            getResponse();
        }
        if(loadingBaru === true && selesai === true){
            postResponse();
        }
        if(Stateresult !== null){
            navigation.navigate('finish');
            setSelesai(false);
            setLoadingBaru(false);
        }
    })
    if(question === null || loading === true || loadingBaru === true){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        )
    } else {
    const onPressSkrining = (id_answer, id_question, index, score, last) => {
        if(last === true){
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            ubahScore(Statescore + Number(score));
            setQuestion(null);
            setSelesai(true);
            setLoadingBaru(true);
        } else {
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            ubahScore(Statescore + Number(score));
            navigation.navigate('question', {
                category_id : 'SKRINING_GIZI',
                question_id : index + 1,
                image_id: 0
            })
        }
    }
    const onPressIbu = (id_answer, id_question, index, last) => {
        if(last === true){
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            setQuestion(null);
            setLoading(true);
            navigation.navigate('question', {
                category_id : 'PERILAKU_ANAK',
                question_id : 0
            })
        } else {
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            navigation.navigate('question', {
                category_id : 'PENGETAHUAN_IBU',
                question_id : index + 1
            })
        }
    } 
    const onPressAnak = (id_answer, id_question, index, last) => {
        if(last === true){
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            setQuestion(null);
            setLoading(true);
            navigation.navigate('question', {
                category_id : 'SKRINING_GIZI',
                question_id : 0,
                image_id : 0
            })
        } else {
            ubahAnswer({answer: id_answer, question_id : id_question}, anak.result.id);
            navigation.navigate('question', {
                category_id : 'PERILAKU_ANAK',
                question_id : index + 1
            })
        }
    }    
    const buttonImage = (index, question_id, last) => {
        if(last === true){
            navigation.navigate('question',{
                category_id : 'SKRINING_GIZI',
                question_id : question_id,
                image_id: null
            })
        } else {
            navigation.navigate('question',{
                category_id : 'SKRINING_GIZI',
                question_id : question_id,
                image_id: index
            })
        }
      
    }
    const questionImage = (id) => {
        if(id === 23){
            if(image_id !== null){
            for(let i = 0; i < image.length; i++){
                if(i === image_id){
                    if(i === image.length - 1){
                        return (
                            <View style={{flex:1}}>
                            <Image style={{resizeMode: 'center', height: 300, width: 400}} source={image[i].source}/>
                            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={() => buttonImage(image_id - 1, 2, false)}>
                                <Text style={{fontSize: 16}}>Prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(0, 2, true)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                    } else if(i === 0){
                        return (
                            <View style={{flex:1}}>
                            <Image style={{resizeMode: 'center', height: 300, width: 350}} source={image[i].source}/>
                            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity disabled>
                                <Text style={{fontSize: 16}}></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(i + 1, 2, false)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                    }
                        return (
                            <View style={{flex:1}}>
                            <Image style={{resizeMode: 'center', height: 300, width: 350}} source={image[i].source}/>
                            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={() => buttonImage(i - 1, 2, false)}>
                                <Text style={{fontSize: 16}}>Prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(i + 1, 2, false)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                }
            }
            } else {
                return (
                    <View style={{height: 100 , width:'100%', justifyContent:'space-around'}}>
                        <Button status="danger" size="small" appearance="outline" onPress={() => onPressSkrining(0, 23, 2, 0,false)}>
                            No
                        </Button>
                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressSkrining(1, 23, 2, question[2].score,false)}>
                            Yes
                        </Button>
                    </View>
                )
            }
        } else if(id === 22){
            if(image_id !== null){
                for(let i = 0; i < image2.length; i++){
                    if(i === image_id){
                            return (
                                <View style={{flex:1}}>
                                <Image style={{resizeMode: 'cover', height: 300, width: 350}} source={image2[i].source}/>
                                <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableOpacity disabled>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => buttonImage(0, 1, true)}>
                                    <Text style={{fontSize: 16}}>Next</Text>
                                </TouchableOpacity>
                                </View>
                                </View>
                            )
                    }
                }
                } else {
                    return (
                        <View style={{height: 100 , width:'100%', justifyContent:'space-around'}}>
                            <Button status="danger" size="small" appearance="outline" onPress={() => onPressSkrining(0, 22, 1, 0,false)}>
                                No
                            </Button>
                            <Button status="primary" size="small" appearance="outline" onPress={() => onPressSkrining(1, 22, 1, question[1].score,false)}>
                                Yes
                            </Button>
                        </View>
                    )
                }
        } else if(id === 21){
            if(image_id !== null){
            for(let i = 0; i < image1.length; i++){
                if(i === image_id){
                    if(i === image1.length - 1){
                        return (
                            <View style={{flex:1}}>
                            <Image style={{resizeMode: 'cover', height: 350, width: 350}} source={image1[i].source}/>
                            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={() => buttonImage(image_id - 1, 0, false)}>
                                <Text style={{fontSize: 16}}>Prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(image_id - 1, 0, true)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                    } else if(i === 0){
                        return (
                            <View style={{flex:1}}>
                            <Image style={{resizeMode: 'cover', height: 350, width: 350}} source={image1[i].source}/>
                            <View style={{height:50,flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity disabled>
                                <Text style={{fontSize: 16}}></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(i + 1, 0, false)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                    }
                        return (
                            <View style={{flex:1, padding:10}}>
                            <Image style={{resizeMode: 'cover', height: 350, width: 350}} source={image1[i].source}/>
                            <View style={{height:50, flexDirection:'row', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={() => buttonImage(i - 1, 0, false)}>
                                <Text style={{fontSize: 16}}>Prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => buttonImage(i + 1, 0, false)}>
                                <Text style={{fontSize: 16}}>Next</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        )
                }
            }
            } else {
                return (
                    <View style={{width:'100%', justifyContent:'space-around', height:100}}>
                        <Button status="danger" size="small" appearance="outline" onPress={() => onPressSkrining(0, 21, 0, 0,false)}>
                            No
                        </Button>
                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressSkrining(1, 21, 0, question[0].score,false)}>
                            Yes
                        </Button>
                    </View>
                )
            }
        } else if(id === 24){
            return (
                <View style={{width:'100%', justifyContent:'space-around', height:200}}>
                    <Button status="danger" size="small" onPress={() => navigation.navigate('tabel', {
                          result_id : anak.result.id
                      })}>
                        Cek Nilai Status Gizi Anak
                    </Button>
                    <Text style={{color:'red', fontSize: 14, alignSelf:'center'}}>UKUR TERLEBIH DAHULU BB DAN TB ANAK</Text>
                    <Button status="danger" size="small" appearance="outline" onPress={() => onPressSkrining(0, 24, 3, 0, true)}>
                        No
                    </Button>
                    <Button status="primary" size="small" appearance="outline" onPress={() => onPressSkrining(1, 24, 3, question[3].score, true)}>
                        Yes
                    </Button>
                </View>
            )
        }
    }
    const questionElement = () => {
        if(question !== null){
            for(let i = 0; i < question.length; i++){
                if(i === question_id){
                        if(category_id === 'PERILAKU_ANAK'){        
                            if(i === question.length - 1){
                                return (
                                    <View style={{justifyContent:'space-around', flex:1, marginBottom: 10}}>
                                        <Text style={{fontSize:14, color:'#000', marginBottom:10}}>{i + 1}. {question[i].question}</Text>              
                                        {getImage(question[i].id)}
                                        <Button status="danger" size="small" appearance="outline" onPress={() =>  onPressAnak(1, question[i].id, i, true)}>
                                            Tidak Pernah
                                        </Button>
                                        <Button status="warning" size="small" appearance="outline" onPress={() =>  onPressAnak(2, question[i].id, i, true)}>
                                            Jarang
                                        </Button>
                                        <Button status="success" size="small" appearance="outline" onPress={() =>  onPressAnak(3, question[i].id, i, true)}>
                                            Kadang
                                        </Button>
                                        <Button status="info" size="small" appearance="outline" onPress={() =>  onPressAnak(4, question[i].id, i, true)}>
                                            Sering
                                        </Button>
                                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressAnak(5, question[i].id, i, true)}>
                                            Selalu
                                        </Button>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={{justifyContent:'space-around', flex:1, marginBottom: 10}}>
                                        <Text style={{fontSize:14, color:'#000', marginBottom:10}}>{i + 1}. {question[i].question}</Text>              
                                        {getImage(question[i].id)}
                                        <Button status="danger" size="small" appearance="outline" onPress={() =>  onPressAnak(1, question[i].id, i, false)}>
                                            Tidak Pernah
                                        </Button>
                                        <Button status="warning" size="small" appearance="outline" onPress={() =>  onPressAnak(2, question[i].id, i, false)}>
                                            Jarang
                                        </Button>
                                        <Button status="success" size="small" appearance="outline" onPress={() =>  onPressAnak(3, question[i].id, i, false)}>
                                            Kadang
                                        </Button>
                                        <Button status="info" size="small" appearance="outline" onPress={() =>  onPressAnak(4, question[i].id, i, false)}>
                                            Sering
                                        </Button>
                                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressAnak(5, question[i].id, i, false)}>
                                            Selalu
                                        </Button>
                                    </View>
                                )
                            }
                        } else if(category_id === 'PENGETAHUAN_IBU'){
                            if(i === question.length - 1){
                                return (
                                    <View style={{justifyContent:'space-around', flex:1, marginBottom: 10}}>
                                        <Text style={{fontSize:14, color:'#000', marginBottom:10}}>{i + 1}. {question[i].question}</Text>              
                                        {getImage(question[i].id)}
                                        <Button status="danger" size="small" appearance="outline" onPress={() => onPressIbu(0, question[i].id, i, true)}>
                                            No
                                        </Button>
                                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressIbu(1, question[i].id, i, true)}>
                                            Yes
                                        </Button>
                                    </View>
                                )
                            } else {
                                return (
                                    <View style={{justifyContent:'space-around', flex:1, marginBottom: 10}}>
                                        <Text style={{fontSize:14, color:'#000', marginBottom:10}}>{i + 1}. {question[i].question}</Text>              
                                        {getImage(question[i].id)}
                                        <Button status="danger" size="small" appearance="outline" onPress={() => onPressIbu(0, question[i].id, i, false)}>
                                            No
                                        </Button>
                                        <Button status="primary" size="small" appearance="outline" onPress={() => onPressIbu(1, question[i].id, i, false)}>
                                            Yes
                                        </Button>
                                    </View>
                                )
                            }
                        } else if(category_id === 'SKRINING_GIZI'){
           
                                    return(
                                        <View style={{justifyContent:'space-around', flex:1, marginBottom: 10,alignItems:'center'}}>
                                                <Text style={{fontSize:14, color:'#000', marginBottom:10}}>{i + 1}. {question[i].question}</Text>              
                                                {questionImage(question[i].id)}
                                        </View>
                                    )
                        }
                } 
            }
        } else {
            return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
            )
        }
    }
    const titleElement = () => {
        if(category_id === 'SKRINING_GIZI'){
            return(
            <View style={{flex:1, marginBottom:10,justifyContent:'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>STRONG Kids</Text>
                    <View style={{backgroundColor:'#000', height: 4, width: 50, borderRadius: 2}}></View>
            </View>
            )
        } else if(category_id === 'PENGETAHUAN_IBU') {
            return(
                <View style={{flex:1, marginBottom:10,justifyContent:'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Pengetahuan Ibu</Text>
                    <View style={{backgroundColor:'#000', height: 4, width: 50, borderRadius: 2}}></View>
                </View>
            )
        } else if(category_id === 'PERILAKU_ANAK'){
            return(
                <View style={{flex:1, marginBottom:10,justifyContent:'center'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Perilaku Makan Anak</Text>
                    <View style={{backgroundColor:'#000', height: 4, width: 50, borderRadius: 2}}></View>
                </View>
            )
        }
    }
    const onPressBack = (first, id, category) =>{
        if(first === true){
            ubahNullAnswer([]);
            navigation.navigate('anak');
        } else {
            answer.answers.map((value, index) => {
                if(value.question_id === id - 1){
                    updateAnswer(index);
                    if(Statescore !== 0){
                        question.map((value_ques, index_ques) => {
                            if(value_ques.id === value.question_id){
                                ubahScore(Statescore - Number(question[index_ques].score))
                            }
                        })
                    }      
                    navigation.navigate('question', {
                        question_id : question_id - 1,
                        category_id : category,
                        image_id : 0
                    })
                }
            })
        }
    }
    const backElement = () => {
        for(let i = 0; i < question.length; i++){
            if(i === question_id){
                if(i === 0){
                    return (
                        <Button onPress={() => onPressBack(true, 0, question[i].category, question[i].score)} status="primary" style={{width:100}} appearance="outline">
                            Back
                        </Button>
                    )
                } else {
                    return (
                        <Button onPress={() => onPressBack(false, question[i].id, question[i].category, question[i].score)} status="primary" style={{width:100}} appearance="outline">
                            Back
                        </Button>
                    )   
                }
            }
        }
    }
    return (
            <View style={{flex:1, backgroundColor:'#fff', padding: 20}}>
                {titleElement()}
                <View style={{flex:5, marginBottom:20}}>
                    {questionElement()}
                </View>
                <View style={{flex:1}}>
                    {backElement()}
                </View>
            </View>
        )
    }
    }
const MapStateToProps = (state) => {
    return {
        anak : state.Anak,
        answer: state.Answer,
        Statescore: state.Score,
        Stateresult: state.Result
    }
}
const DispatchToProps = (dispatch) => {
    return {
        ubahResult: (value) => dispatch({type:'UBAH_RESULT', payload:value}),
        ubahScore: (value) => dispatch({type:'UBAH_SCORE', payload: value}),
        ubahAnswer: (value, id_result) => dispatch({ type:'ADD_ANSWER', payload: value, result_id: id_result}),
        updateAnswer: (value) => dispatch({type:'UBAH_ANSWER', payload: value}),
        ubahNullAnswer: (value) => dispatch({type:'UBAH_NULL_ANSWER', payload: value})
    }
    
}
export default connect(MapStateToProps, DispatchToProps)(QuestionPage);