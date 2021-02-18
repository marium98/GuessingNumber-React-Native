import React, {useState , useRef , useEffect} from 'react';
import {View , Text ,StyleSheet, Alert , ScrollView , FlatList} from 'react-native';
import Card from '../components/card';
import NumberContainer from '../components/numberContainer';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import {Ionicons} from '@expo/vector-icons';

const generateRandom = (min , max , exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude)
    {
        return generateRandom(min , max ,exclude);
    }
    else 
    {
        return rndNum;
    }
};
const renderListItem = (listLength, itemData) => (
    <View style={styles.list}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );


const GameScreen = props => {
    const initialGuess = generateRandom(1,100,props.userChoice);
    const [currentGuess , setCurrentGuess] = useState(initialGuess);
    const [pastGuesses , setPastGuesses] = useState([initialGuess.toString()]);
    const lower = useRef(1);
    const higher = useRef(100);

    const {userChoice , onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice)
        {
           onGameOver(pastGuesses.length);
           
        }
    }, [currentGuess , userChoice , onGameOver]);

    const nextGuessHandler = direction => {
        if(
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        )
       { Alert.alert('Dont Lie','You know this is wrong!' , [
            {text: 'Sorry' , style: 'cancel'}
        ]);
        return;
    }
    if(direction === 'lower')
    {
        higher.current = currentGuess;
    }
    else {
        lower.current = currentGuess + 1;
    }
    const nextNumber =  generateRandom(lower.current , higher.current , currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);

    };
return (
   <View style = {styles.container}>
       <Text>Opponent's Guess</Text>
       <NumberContainer>{currentGuess}</NumberContainer>
       <Card style = {styles.buttonConatiner}>
           <MainButton  onPress = {nextGuessHandler.bind(this,'lower')}>
               <Ionicons name="md-remove" size={30} color="white" />
               </MainButton>
           <MainButton  onPress = {nextGuessHandler.bind(this,'greater')}>
           <Ionicons name="md-add" size={30} color="white" />
               </MainButton>
       </Card>
       <View style = {styles.listConatiner}>

       {/* <ScrollView contentContainerStyle = {styles.listItems}>
           {pastGuesses.map((guess , index) => renderListItems(guess , pastGuesses.length - index) )}
          
       </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.listItems}
        />
       </View>
      
   </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    list: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
        
    },
    listConatiner: {
        flex: 1,
        width: '60%',
    },
    listItems: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default GameScreen;