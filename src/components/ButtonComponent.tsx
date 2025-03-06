import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {Colors} from '../utils/Colors';
import {getHeight, getWidth} from '../utils/Dimensions';
import {memo, useState} from 'react';

type Props = {
  text: string;
  onPress: () => void;
  nonPromise?: boolean;
  style?: ViewStyle;
  props?: PressableProps;
};

const ButtonComponent = ({
  text,
  onPress,
  nonPromise,
  style,
  ...props
}: Props) => {
  const [loading, setLoading] = useState(false);
  const handleOnPress = async () => {
    setLoading(true);
    await onPress();
    setLoading(false);
  };
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handleOnPress}
      disabled={loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: getHeight(4),
    justifyContent: 'center',
    backgroundColor: Colors.black,
    marginHorizontal: getWidth(1),
  },
  text: {color: Colors.white, textAlign: 'center'},
});

export default memo(ButtonComponent);
