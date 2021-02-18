import React from 'react';
import {View , Text , TouchableOpacity , StyleSheet} from 'react-native';
import Color from '../constants/Color';

const MainButton = props => {
    return(
        <TouchableOpacity activeOpacity={0.8} onPress = {props.onPress}>
            <View style = {styles.button}>
                <Text style = {styles.text}>
                    {props.children}
                </Text>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
     button: {
         backgroundColor: Color.primary,
         borderRadius: 40,
         paddingHorizontal: 30,
         paddingVertical: 12,

     },

     text: {
         fontSize: 18,
         color: 'white',
      


     },
});

export default MainButton;