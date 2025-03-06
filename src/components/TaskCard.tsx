import {StyleSheet, Text, View} from 'react-native';
import {getHeight, getWidth} from '../utils/Dimensions';
import {Colors} from '../utils/Colors';
import ButtonComponent from './ButtonComponent';
import {memo, useState} from 'react';
import {_delete, _put} from '../networking/Methods';
import {BaseUrl, Endpoints} from '../networking/Endpoints';
import {useDispatch, useSelector} from 'react-redux';
import {updateTaskList} from '../redux/DataSlice';
import Toast from 'react-native-toast-message';

type Props = {
  item: {
    id: string;
    title: string;
    completed: boolean;
  };
};

const TaskCard = ({item}: Props) => {
  const {id, title, completed} = item;
  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const completeTask = async () => {
    try {
      const url = BaseUrl + Endpoints.updateTasks;
      const response = await _put(url, id);
      const taskList = tasks.map(
        (element: {id: string; completed: boolean}) => {
          return {
            ...element,
            completed: response.id == element.id ? true : element.completed,
          };
        },
      );
      dispatch(updateTaskList({tasks: taskList}));
    } catch (error) {
      Toast.show({type: 'error', text1: 'Try Again', position: 'bottom'});
    }
  };
  const deleteTask = async () => {
    try {
      const url = BaseUrl + Endpoints.updateTasks;
      await _delete(url, id);
      const taskList = tasks.filter(
        (element: {id: string}) => id != element.id,
      );
      dispatch(updateTaskList({tasks: taskList}));
    } catch (error) {
      Toast.show({type: 'error', text1: 'Try Again', position: 'bottom'});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.footerContainer}>
        <ButtonComponent
          text={completed ? 'Completed' : 'Mark as Complete'}
          onPress={completeTask}
          disabled={completed}
        />
        <ButtonComponent text="Delete" onPress={deleteTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidth(90),
    padding: '2%',
    marginVertical: getHeight(1),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    elevation: 10,
  },
  title: {fontSize: 17, marginLeft: getWidth(2)},
  footerContainer: {
    flexDirection: 'row',
    marginTop: getHeight(1),
    marginBottom: getHeight(0.5),
  },
});

export default memo(TaskCard);
