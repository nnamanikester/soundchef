import React from 'react';
import {ToastAndroid, PermissionsAndroid} from 'react-native';
import NavigationFlows from './NavigationFlows';

const App = () => {
  React.useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'SoundChef needs to access your storage ' +
              'so you can play your musics.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ToastAndroid.show('Permission Granted!', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Sorry! You cannot use this app unless you accept the permission!',
            ToastAndroid.SHORT,
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    requestStoragePermission();
  });

  return (
    <>
      {/* <View style={styles.statusBar}>
        <StatusBar
          translucent
          backgroundColor="#8f5332"
          barStyle="light-content"
        />
      </View> */}
      <NavigationFlows />
    </>
  );
};

// const styles = StyleSheet.create({
//   statusBar: {
//     height: STATUSBAR_HEIGHT,
//   },
// });

export default App;
