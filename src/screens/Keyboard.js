import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Keyboard = ({alphabet, action}) => {

    return(
        <View style={styles.position}>
            {
                alphabet.map(
                    (letter, key) => {
                        return (
                            <TouchableOpacity onPress={() => action(letter)} key={"keyboard_" + key} style={styles.bouton}>
                            <Text style={{color: 'white', textAlign: 'center'}}>
                              {letter}
                            </Text>
                          </TouchableOpacity>
                          );   
                    }
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    position: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20,
    },
    bouton: {
        backgroundColor: '#4d4d4d',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        opacity: 0.9,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Keyboard;