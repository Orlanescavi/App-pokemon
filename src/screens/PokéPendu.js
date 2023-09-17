import React, { Component } from "react";
import { StyleSheet, Image, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Keyboard from "./Keyboard";
import { wordCollection } from "./wordCollection";

class Game extends Component {

  state = {
    wordCollection: wordCollection,
    currentWord: null,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split(''),
    usedLetter: [],
    win: 0,
    attempt: 10,
    hide: true,
    correctLetters: [],
  }

  componentDidMount() {
    this.initGame()
  };

  checkLetter = (letter) => {
    const { currentWord, attempt, usedLetter, correctLetters } = this.state;

    if (attempt === 0) {
      this.setState({
        hide: false,
        message: `Vous avez perdu car vous avez utilisé toutes vos tentatives. Le pokémon était ${currentWord}`,
      });
      return;
    }

    const isInWord = currentWord.includes(letter);
    const isAlreadyUsed = usedLetter.includes(letter);

    if (isAlreadyUsed) {
      this.setState({ message: `La lettre ${letter} a déjà été utilisée` });
      return;
    }

    if (isInWord) {
      const updatedCorrectLetters = [...correctLetters, letter];
      const updatedUsedLetter = [...usedLetter, letter];
      const updatedWin = updatedCorrectLetters.length === new Set(currentWord).size;

      const message = updatedWin ? `Bravo le pokémon était bien ${currentWord}!` : `La lettre ${letter} est dans le mot`;

      this.setState(prevState => ({
        correctLetters: updatedCorrectLetters,
        usedLetter: updatedUsedLetter,
        win: updatedWin ? updatedCorrectLetters.length : prevState.win,
        message
      }));

      if (updatedWin) {
        return;
      }
    } else {
      this.setState(prevState => ({
        attempt: prevState.attempt - 1,
        message: `La lettre ${letter}, n'est pas dans le mot`,
      }));
    }
  }
  
  

  Restart = () => {
    this.setState({
      currentWord: null,
      usedLetter: [],
      win: 0,
      attempt: 10,
      hide: true,
      correctLetters: [],
      message: ''
    }, () => {
      this.initGame();
    });
  }

  hideLetter = () => {
    this.setState({ hide: true });
  }

  initGame = () => {
    const randomIndex = Math.floor(Math.random()* this.state.wordCollection.length)
    const currentWord = this.state.wordCollection[randomIndex];
    this.setState({ 
      currentWord, 
      usedLetter: [], 
      hide: true, 
      correctLetters: [currentWord[0]] 
    });
  }

  render() {
    const { currentWord, hide, correctLetters, message, attempt, Restart } = this.state;
    const revealedWord = currentWord
      ? currentWord
          .split('')
          .map((letter, index) => (
            <Text key={index} style={{ fontSize: 30, color: 'white' }}>
              {correctLetters.includes(letter) || index === 0 ? letter : hide ? '_' : letter}
            </Text>
          ))
      : '';

    return (
      <ImageBackground style={styles.main}
      source={require('../screens/img/route.png')}
      >
        <View style={styles.containerAttempt}>
          <Text style={styles.attempt}>Tentatives : {attempt}</Text>
        </View>
        <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        >
          <TouchableOpacity onPress={this.Restart} style={styles.restart}>
            <Text>Recommencer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../screens/img/Pokeball.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.game}>
          <Text>
            {revealedWord}
          </Text>
        </View>
      <View style={styles.keyboardContainer}>
        <Keyboard
          alphabet={this.state.alphabet}
          action={this.checkLetter}
        />
      </View>
        <View style={styles.dialog}>
          <View
             style={{
              height: 70,
              backgroundColor: 'white',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#8f8f8f',
              borderLeftColor: '#5f85a3',
              borderLeftWidth: 10,
              borderRightColor: '#5f85a3',
              borderRightWidth: 10,
              shadowColor: 'black',
              shadowOffset: { width: 5, height: 4 },
              shadowOpacity: 0.7,
              shadowRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#4d4d4d',
                fontFamily: 'Arial',
                textAlign: 'center',
                fontSize: 16,
              }}
            >
              {message}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerAttempt: {
    width: 130,
    height: 40,
    backgroundColor: 'black',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attempt:{
    color: 'white',
    textAlign: 'center',
  },
  restart:{
    width: 150,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#8f8f8f',
    borderLeftColor: '#5f85a3',
    borderLeftWidth: 10,
    borderRightColor: '#5f85a3',
    borderRightWidth: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  keyboardContainer:{
    width: '100%',
  },
  game: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  letter: {
    fontSize: '5%',
    color: 'white',
  },
  dialog: {
    width: '50%',
  },
});

export default Game;
