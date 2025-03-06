import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const getWidth = (input: number) => {
  return (input / 100) * width;
};

const getHeight = (input: number) => {
  return (input / 100) * height;
};

export {getWidth, getHeight};
