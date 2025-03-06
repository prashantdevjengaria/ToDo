import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainContainer from '../containers/MainContainer';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Main" component={MainContainer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
