import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert} from 'react-native';

function AddTodo({addTodo}) {
    const [text,setText] = useState('');

    const handleChange = text => {
        setText(text);
    }

    const addTodoItem = async()=> {
        if (text.length > 3) {
            addTodo(currentState=>{
                return [{text:text,key: Math.random().toString()},...currentState]            
            });
        }else{
            Alert.alert('OPPS!','Todo Cannt less than 3',[{text: 'Understood',onPress:()=>console.log('Alert Closed')
            }])
        }

    }

    const updateUi = ()=> {
        if (text.length > 3) {
            addTodoItem().then(()=>{
                setText('');
            })
        }else{
            addTodoItem()
        }
    }

 return(
    <View style={styels.addTodo}>
       <View style={styels.input}> 
        <TextInput 
                placeholder='new todo....'
                onChangeText={handleChange}
                value={text}
        />
       </View>
        <Button onPress={updateUi} title="ADD" color="coral"/>
    </View>
 )   
}

const styels = StyleSheet.create({
    addTodo: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20
    },
    input: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10
    }
});

export default AddTodo;