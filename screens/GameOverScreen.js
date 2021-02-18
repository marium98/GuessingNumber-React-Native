import React from  'react';
import {Text, View ,Button,StyleSheet , Image} from 'react-native';
import BodyText from '../components/BodyText';
import Color from '../constants/Color';
import MainButton from '../components/MainButton';


const GameOver = props => {
    return (

        <View style = {styles.screen}>
           
            <BodyText>
                'The Game Is Over!'
                </BodyText>
                <View style = {styles.imageContainer}>
                        <Image 
                        source = {{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFAVJXC0AyXPR-BkTW_dUCh1X7kZokGnflaw&usqp=CAU'}}
                        // source = {require('../assets/success.png')} 
                        style = {styles.image} resizeMode = 'cover'
                        />
                </View>
               
               <View style = {styles.bodyContainer}>
               <BodyText style = {styles.result}>
                   Your phone neeeds <Text style = {styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style = {styles.highlight}>{props.userNumber}</Text> 
                </BodyText>
               </View>
                
                
                
                    <MainButton onPress={props.onRestart}>Restart Game</MainButton>

        </View>
    )

};

const styles = StyleSheet.create({
       screen: {
           flex: 1,
           justifyContent: 'center',
           fontSize: 24,
          alignItems: 'center',
       },
       imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
       },
       highlight: {
           color: Color.primary,
       },
       bodyContainer: {
           marginHorizontal: 20,
           marginVertical: 20,
       },
       result: {
           textAlign: 'center',
           fontSize: 20,
       },
       image: {
           width: '100%',
           height: '100%',
          
       }

});

export default GameOver;