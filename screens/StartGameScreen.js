import React , {useState} from 'react';
import {View, Text , StyleSheet , TextInput , Button , TouchableWithoutFeedback , Keyboard, Alert} from 'react-native';
import Card from '../components/card.js';
import NumberContainer from '../components/numberContainer';
import Color from '../constants/Color';
import Input from '../components/input';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';



const StartGameScreen = props => {
    const [enteredValue , setEnteredValue ] = useState('');
    const [confirmed , setConfirmed] = useState(false);
    const [selectedNumber , setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g , ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99)
        {
            Alert.alert('Invalid Number' , 'Number should be between 1 to 99.',
            [{text: 'Okay' , style: 'destructive' , onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(choosenNumber);
        Keyboard.dismiss();
        // keyboard.dismiss();
    };

    let confirmOutput;
    if(confirmed){
       confirmOutput =  (
           <Card style = {styles.summaryContainer}>
                <Text>Choosen Number</Text>
           <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton  onPress = { () => props.onStartGame(selectedNumber)}>
                    Start Game
                    </MainButton>
               
           </Card>
      
       );
    }
    return( 
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss(); 
        }
        }>
    <View style = {styles.screen}>
        <Text style={styles.title}>Start Game!</Text>
       <Card style={styles.inputContainer}>
           <BodyText>Select A Number</BodyText>
           <Input style={styles.inputText} blurOnSubmit
           keyboardType = 'numeric'
           autoCapitalize = 'none'
           autoCorrect = {false}
           maxLength = {2}
           onChangeText = {numberInputHandler}
           value = {enteredValue}
           />
           <View style={styles.buttonContainer}>
                <View style= {styles.button}><Button title='Reset' 
                onPress={resetInputHandler} 
                color = {Color.primary}
                />
                </View> 
                <View style= {styles.button}><Button title='Confirm' 
                onPress={confirmInputHandler} 
                color = {Color.accent}
                /></View>  
           </View>
       </Card>
       {confirmOutput}
    </View>
    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
   
    screen:{
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
      
    },
    inputText:{
        width: 50,
        textAlign: 'center',
    },

    title:{
        fontSize: 18,
        marginVertical: 10,
    },
    inputContainer:{
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },

    buttonContainer:{
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'space-between',
       paddingHorizontal: 10,
    },
    button:{
        width: 100
    },
    summaryContainer:{
      marginTop: 20,
      alignItems: 'center'
    }


});

export default StartGameScreen;