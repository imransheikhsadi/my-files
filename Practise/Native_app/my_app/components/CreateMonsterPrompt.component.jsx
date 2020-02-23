import React,{useState} from 'react'
import {View,StyleSheet,TextInput,Button,Text} from 'react-native'

const CreateMonster = ({create,monsterCreator})=>{
	const [state,setState] = useState({id:null,name:''})
	
	const submitMonster = ()=>{
		create(state)
                setState({id:null,name:''})
	}

	const handleName = (name)=>{
		setState({...state,name:name})
	}

	const handleId = (id)=>{
		setState({...state,id:id})
	}

	return <View style={{margin: 10}}>
		<View style={{padding: 5}}>
		<Text>Monster Name</Text>
        		<TextInput 
				style={styles.input} 
				onChangeText={handleName}
				value={state.name}
			/>
		</View>
		<View style={{padding: 5}}>
			<Text>Monster Prototype</Text>
			<TextInput 
				onChangeText={handleId}
				style={styles.input} 
				value={state.id}
			/>		
		</View>
		<View style={styles.buttonContainer}>
			<Button onPress={submitMonster} title="SUBMIT"/>
			<Button 
				onPress={()=>monsterCreator(false)} 					color="rgb(255,100,100)" 
				title="CLOSE"
			/>
		</View>
  	</View>
}


const styles = StyleSheet.create({
	input: {
		height: 30,
		backgroundColor: 'orange',
		padding: 6,
		borderRadius: 3 
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10
	}
}) 

export default CreateMonster;
