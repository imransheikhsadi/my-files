import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, StatusBar } from 'react-native';

export default function App() {
  const [getGoalText,setGoalText] = useState('');
  const [getGoals,setGoals] = useState([]);

  const inputHandler = (text) => {
    setGoalText(text)
  };

  const addGoal = () => {
    setGoals(currentGoals=>[...currentGoals,getGoalText])
  }; 

  return (
    <View style={styles.screen}> 
      <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Course Goal" 
            onChangeText={inputHandler}
            value={getGoalText}
          />
          <Button title="ADD" onPress={addGoal}/>
      </View>
      <View>
          {
            getGoals.map(goal=><Text key={goal}>{goal}</Text>)
          }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'red',
    marginTop: StatusBar.currentHeight
  },
  inputContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'skyblue'
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    flex: 1,
  }
});
