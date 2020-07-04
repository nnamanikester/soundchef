import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
// import {MusicFiles} from '../utils';
import MusicList from '../components/MusicList';
import {travis} from '../assets/images';
import StackPlayer from '../components/StackPlayer';
import SwipeablePlaylist from '../components/SwipeablePlaylist';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const PlayList = ({navigation}) => {
  const [musics] = React.useState([
    {
      key: '1',
      art: travis,
      title: 'The Weekend',
      subtitle: 'Party Monster',
      time: '3:55',
    },
    {
      key: '2',
      art: travis,
      title: '21 Savage',
      subtitle: 'A Lot',
      time: '4:25',
    },
    {
      key: '3',
      art: travis,
      title: 'Post Malone',
      subtitle: 'Goodbyes',
      time: '5:05',
    },
    {
      key: '4',
      art: travis,
      title: 'Calvin Harris ft Future',
      subtitle: 'Rollin',
      time: '3:43',
    },
  ]);

  // React.useEffect(() => {
  //   MusicFiles.getAll({
  //     blured: true, // works only when 'cover' is set to true
  //     artist: true,
  //     duration: true, //default : true
  //     cover: false, //default : true,
  //     genre: true,
  //     title: true,
  //     minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
  //     fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'], // for iOs Version
  //   })
  //     .then((tracks) => {
  //       console.log(tracks);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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

        {musics.map((m) => {
          return (
            <MusicList
              key={m.key}
              art={m.art}
              title={m.title}
              subtitle={m.subtitle}
              time={m.time}
              onClick={() =>
                navigation.navigate('Player', {
                  title: m.title,
                  subtitle: m.subtitle,
                  time: m.time,
                  art: m.art,
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
