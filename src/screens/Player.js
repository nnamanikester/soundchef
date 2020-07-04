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
import {
  playerBg,
  pause,
  forward,
  backward,
  arrowBack,
  play,
} from '../assets/images';
import {formatTime} from '../utils';
import TrackPlayer from 'react-native-track-player';
import MusicFiles from 'react-native-get-music-files';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Player = ({navigation, route: {params}}) => {
  const {title, author, cover, duration, album, genre, path} = params.music;
  const [track, setTrack] = React.useState({});
  const [playing, setPlaying] = React.useState(false);
  const [seekTime, setSeekTime] = React.useState(0);
  const [id, setId] = React.useState(params.id);

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
      .then((t) => {
        setTrack({
          id: `${id}`,
          url: `file://${t[id].path}`,
          title: t[id].title,
          artist: t[id].author,
          album: t[id].album,
          genre: t[id].genre,
          artwork: t[id].cover,
        });
      })
      .catch((error) => {
        // catch the error
      });
  }, [id]);

  React.useEffect(() => {
    async function set() {
      let t = await TrackPlayer.getBufferedPosition();
      let state = await TrackPlayer.getState();
      let trackId = await TrackPlayer.getCurrentTrack();

      setSeekTime(t);
      if (track.id === trackId) {
        setPlaying(state === 3);
      }
    }
    set();
  }, [seekTime, playing, track.id]);

  const playMusic = async () => {
    if (!track.id) {
      return;
    }
    let state = await TrackPlayer.getState();
    let trackId = await TrackPlayer.getCurrentTrack();

    if (trackId !== track.id) {
      TrackPlayer.reset();
    }

    TrackPlayer.add(track).then(() => {
      if (state === 3 && trackId !== track.id) {
        TrackPlayer.play();
        setPlaying(true);
      }
    });

    if (state === 3) {
      TrackPlayer.pause();
      setPlaying(false);
    } else {
      TrackPlayer.play();
      setPlaying(true);
    }
  };

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
          <Image style={styles.art} source={{uri: cover}} />
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.author}>
            {author}
          </Text>
        </View>
        <View style={styles.playerContainer}>
          <View style={styles.seekerContainer}>
            <View style={styles.seeker} />
          </View>
          <View style={styles.seekerDutarionContainer}>
            <Text style={styles.duration}>{formatTime(seekTime)}</Text>
            <Text style={styles.duration}>{formatTime(duration)}</Text>
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={() => TrackPlayer.reset()}
            style={styles.controls}
            activeOpacity={0.99}>
            <Image source={backward} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playMusic()}
            style={styles.controls}
            activeOpacity={0.99}>
            {playing ? (
              <Image style={{width: 60, height: 60}} source={pause} />
            ) : (
              <Image style={{width: 60, height: 60}} source={play} />
            )}
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
    width: '90%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  author: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
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
