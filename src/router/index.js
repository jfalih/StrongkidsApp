import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from '../components/pages/WelcomePage';
import { NavigationContainer } from '@react-navigation/native';
import AnakPage from '../components/pages/AnakPage';
import OrtuPage from '../components/pages/OrtuPage';
import QuestionPage from '../components/pages/QuestionPage';
import ScorePage from '../components/pages/ScorePage';
import TabelPage from '../components/pages/TabelPage';
import EdukasiPage from '../components/pages/EdukasiPage';
import FinishPage from '../components/pages/FinishPage';


const Router = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="home" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="home" component={WelcomePage} />
      <Stack.Screen name="score" component={ScorePage} />
      <Stack.Screen name="ortu" component={OrtuPage} />
      <Stack.Screen name="anak" component={AnakPage} />
      <Stack.Screen name="question" component={QuestionPage} />
      <Stack.Screen name="finish" component={FinishPage} />
      <Stack.Screen name="edukasi" component={EdukasiPage} />
      <Stack.Screen name="tabel" component={TabelPage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;