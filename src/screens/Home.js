import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const Home = () => {
  const navigation = useNavigation();
  const [audio, setAudio] = useState(new Audio.Sound());

  useEffect(() => {
    (async () => {
      try {
        await audio.loadAsync(require('../screens/Sound/Littleroot_Town.mp3'));
        await audio.setIsLoopingAsync(true);
      } catch (error) {
        console.error('Erreur lors du chargement du son', error);
      }
    })();

    return () => {
      audio.unloadAsync();
    };
  }, [audio]);

  const playSound = async () => {
    try {
      await audio.replayAsync();
    } catch (error) {
      console.error('Erreur lors de la lecture du son', error);
    }
  }

  return (
    <ImageBackground style={styles.main} source={require('../screens/img/feli-cite.png')}>
      <View style={styles.logoContainer}>
        <Image source={require('../screens/img/Pokemon-Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Bienvenue, vous pouvez jouer au jeu du Pendu, trouvez le nom du Pokémon!</Text>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('PokéPendu'); playSound(); }}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  textContainer: {
    marginTop: '5%',
    paddingHorizontal: '5%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
