// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';

// export default function App() {
//   const [getCount, setCount] = useState(0);

//   const increment = ()=>{
//     setCount(getCount+1)
//   }
//   const decrement = ()=>{
//     setCount(getCount-1)
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={{
//         fontSize: 30,
//         color: 'red',
//         textAlign: 'center',
//         marginBottom: 40
//       }}>{getCount}</Text>
//       <View style={styles.button_container}>
//         <Button title="Increment" onPress={increment}/>
//         <Button title="Decrement" onPress={decrement}/>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'lightgray',
//     display: 'flex',
//     height: '100%',
//     justifyContent: 'center'
//   },
//   button_container: {
//     display: "flex",
//     flexDirection: 'row',
//     justifyContent: 'space-evenly'
//   }
// });

import * as React from 'react';
import { View, StyleSheet,Button,ScrollView } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import axios from 'axios';
import Card from './components/Card.component.jsx';
import CreateMonster from './components/CreateMonsterPrompt.component.jsx'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      createMonsterPrompt: false
    }
  }

fetch = ()=>{
     axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
      this.setState({users:[ ...response.data,...this.state.users]})
    })
    .catch((err)=>console.log(err))
 }

createMonster = (newMonster)=>{
	this.setState({users: [newMonster,...this.state.users]})
}

monsterCreator = value =>{
	this.setState({createMonsterPrompt: value})

}

  render() {
    return (
      <ScrollView style={this.state.users.length < 1 && {...styles.container,paddingTop: '40%'}}>
        <View style={{marginTop: '10%',padding: 10}}>
          <Button  title="SEE MONSTERS" onPress={this.fetch}/>
        </View>
	<View style={{padding: 10}}>
          <Button 
		color="royalblue"  
		title="CREATE A MONSTER"
		onPress={this.monsterCreator}
	/>

        </View>
	<View>
		{this.state.createMonsterPrompt && 
		<CreateMonster 			
			create={this.createMonster}
			monsterCreator = {this.monsterCreator}
		/>}	
	</View>
        <View style={styles.card_container}>
          {
            this.state.users.map((user)=>{
		console.log('map is called')
              return (<Card key={user.id} name={user.name} id={user.id}/>)
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    padding: 10
  },
card_container: {
     flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center'
}
});


