import React from 'react';
// import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import NavigationFlows from './NavigationFlows';

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const App = () => {
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
