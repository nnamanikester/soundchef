import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {playerBg, pause, forward, backward, arrowBack} from '../assets/images';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Player = ({navigation, route: {params}}) => {
  const {title, subtitle, art, time} = params;

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          translucent
          backgroundColor="#8f5332"
          barStyle="light-content"
        />
      </View>
      <Image style={styles.background} source={playerBg} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}>
        <Image style={styles.arrowBack} source={arrowBack} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.imageHolder}>
          <Image style={styles.art} source={art} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{subtitle}</Text>
        </View>
        <View style={styles.playerContainer}>
          <View style={styles.seekerContainer}>
            <View style={styles.seeker} />
          </View>
          <View style={styles.seekerDutarionContainer}>
            <Text style={styles.duration}>0:00</Text>
            <Text style={styles.duration}>{time}</Text>
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controls} activeOpacity={0.99}>
            <Image source={backward} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controls} activeOpacity={0.99}>
            <Image source={pause} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controls} activeOpacity={0.99}>
            <Image source={forward} />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  background: {
    width: '110%',
    height: '110%',
    position: 'absolute',
    left: -10,
    top: -10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder: {
    width: 220,
    height: 220,
    elevation: 10,
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  titleContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  author: {
    color: '#fff',
    fontSize: 14,
  },
  playerContainer: {
    width: '80%',
  },
  seekerContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    elevation: 3,
  },
  seeker: {
    height: '100%',
    width: '80%',
    backgroundColor: '#353535',
  },
  seekerDutarionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  duration: {
    color: '#fff',
  },
  controlsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    marginVertical: 40,
  },
  controls: {
    marginHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    top: 40,
    left: 10,
  },
  arrowBack: {
    width: 20,
    height: 20,
  },
});

export default Player;
