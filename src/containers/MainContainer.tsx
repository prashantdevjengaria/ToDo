import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TaskCard from '../components/TaskCard';
import {Colors} from '../utils/Colors';
import {Fragment, useCallback, useEffect, useState} from 'react';
import {getHeight, getWidth} from '../utils/Dimensions';
import {_get, _post} from '../networking/Methods';
import {BaseUrl, Endpoints} from '../networking/Endpoints';
import {useDispatch, useSelector} from 'react-redux';
import {updateTaskList} from '../redux/DataSlice';
import ButtonComponent from '../components/ButtonComponent';
import Toast from 'react-native-toast-message';

const MainContainer = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState({visible: false, text: ''});
  const [sorted, setSorted] = useState<{state: boolean; data: {}[]}>({
    state: false,
    data: [],
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const params = '?_limit=10';
      const url = BaseUrl + Endpoints.updateTasks + params;
      const response = await _get(url);
      const taskList = response.map(
        (element: {id: string; title: string; completed: boolean}) => {
          return {
            id: element.id,
            title: element.title,
            completed: element.completed,
          };
        },
      );
      dispatch(updateTaskList({tasks: taskList}));
    } catch (error) {}
    setLoading(false);
  };

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {
        id: string;
        title: string;
        completed: boolean;
      };
      index: number;
    }) => <TaskCard key={index} item={item} />,
    [],
  );

  const addTask = async (text: string) => {
    try {
      const url = BaseUrl + Endpoints.updateTasks;
      const payload = new FormData();
      payload.append('title', text);
      payload.append('completed', false);
      await _post(url, payload);
      dispatch(
        updateTaskList({
          tasks: [
            {id: Number(tasks[0].id) + 1, title: text, completed: false},
            ...tasks,
          ],
        }),
      );
    } catch (error) {
      Toast.show({type: 'error', text1: 'Try Again'});
    }
  };

  const onChangeText = (text: string) => {
    setTextInput(textInput => ({...textInput, text: text}));
  };

  const handleAddTask = () => {
    if (textInput.visible && textInput.text) addTask(textInput.text);
    setTextInput({visible: !textInput.visible, text: ''});
  };

  const handleTaskSorting = () => {
    let sortedData = [];
    if (!sorted.state)
      sortedData = [...tasks].sort((a: {title: string}, b: {title: string}) =>
        a.title.localeCompare(b.title),
      );
    setSorted({state: !sorted.state, data: sortedData});
  };

  const RenderFlatlist = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={sorted.state ? sorted.data : tasks}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchData} />
      }
    />
  );

  const handleBackgroundPress = () => {
    textInput.visible && handleAddTask();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do</Text>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={Colors.black}
          style={styles.activityIndicator}
        />
      ) : (
        <Fragment>
          {textInput.visible ? (
            <Pressable style={{flex: 1}} onPress={handleBackgroundPress}>
              <RenderFlatlist />
            </Pressable>
          ) : (
            <RenderFlatlist />
          )}
          <View style={styles.footerContainer}>
            {textInput.visible && (
              <TextInput
                placeholder="Enter task name"
                placeholderTextColor={Colors.black}
                onChangeText={onChangeText}
                style={styles.textInput}
              />
            )}
            <View style={styles.footerButtonContainer}>
              <ButtonComponent
                text={sorted.state ? 'Sorted by title' : 'Sort by title'}
                onPress={handleTaskSorting}
              />
              <ButtonComponent text="Add Task" onPress={handleAddTask} />
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  activityIndicator: {top: getHeight(40)},
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: getHeight(1),
  },
  footerContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingVertical: getHeight(1),
    marginHorizontal: getWidth(5),
  },
  footerButtonContainer: {flexDirection: 'row'},
  textInput: {
    color: Colors.black,
    borderWidth: 1,
    marginHorizontal: getWidth(1),
    marginBottom: getHeight(1),
    paddingLeft: getWidth(3),
    borderRadius: 5,
  },
});

export default MainContainer;
