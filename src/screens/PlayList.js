import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import MusicList from '../components/MusicList';
import {travis} from '../assets/images';
import StackPlayer from '../components/StackPlayer';
import SwipeablePlaylist from '../components/SwipeablePlaylist';
import MusicFiles from 'react-native-get-music-files';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const PlayList = ({navigation}) => {
  const [musics, setMusics] = React.useState([]);

  React.useEffect(() => {
    MusicFiles.getAll({
      blured: false, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'], // for iOs Version
    })
      .then((tracks) => {
        setMusics(tracks);
        console.log(tracks);
      })
      .catch((error) => {
        // catch the error
      });
  }, []);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          translucent
          backgroundColor="#13243d"
          barStyle="light-content"
        />
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Playlists</Text>

        <SwipeablePlaylist data={musics} />

        <Text style={styles.queue}>Queue</Text>

        {musics.map((m, i) => {
          return (
            <MusicList
              key={m.title + i}
              art={{uri: m.cover}}
              title={m.title}
              subtitle={m.author}
              time={m.duration}
              onClick={() =>
                navigation.navigate('Player', {
                  id: i,
                  music: m,
                })
              }
            />
          );
        })}
        <View style={styles.bottomSpace} />
      </ScrollView>
      <StackPlayer title="The Weekend" subtitle="Party Monster" art={travis} />
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    backgroundColor: '#13243d',
    flex: 1,
    paddingHorizontal: 20,
  },
  queue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  bottomSpace: {
    marginVertical: 100,
  },
});

export default PlayList;
