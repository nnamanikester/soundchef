import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {pauseBlack, forwardBlack, backwardBlack} from '../assets/images';

const StackPlayer = ({title, subtitle, art}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.art} source={art} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
      </View>
      <View style={styles.controlsContainer}>
        <Image style={styles.controls} source={backwardBlack} />
        <Image style={styles.controls} source={pauseBlack} />
        <Image style={styles.controls} source={forwardBlack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  controls: {
    width: 20,
    height: 20,
    marginLeft: 25,
  },
});

export default StackPlayer;
