import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header'; 
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOverScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
     Font.loadAsync({
       'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
       'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
     });
};

export default function App() {
  const [userNumber , selectedUserNumber] = useState();
  const [guessRounds , setGuessRounds] = useState(0);
  const [dataLoaded , setDataLoaded] =useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync = {fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    selectedUserNumber(null);
  };

  const SelectNumberHandler = (selectedNumber) => {
      selectedUserNumber(selectedNumber);
     
  };
  
  const GamveOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content =  <StartGameScreen onStartGame={SelectNumberHandler} />
  if(userNumber && guessRounds <= 0 ) {
    content = <GameScreen userChoice={userNumber} onGameOver = {GamveOverHandler} />;
  }
  else if(guessRounds > 0){
    content = <GameOver 
  roundsNumber = {guessRounds}
    userNumber = {userNumber} 
    onRestart = {configureNewGameHandler} />;

  }
  return (
    <View style={styles.container}>
      <Header title= "Start Guessing Number" />
     {content}
      {/* <GameScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
