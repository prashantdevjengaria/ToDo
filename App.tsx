import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RootNavigator from './src/navigators/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
