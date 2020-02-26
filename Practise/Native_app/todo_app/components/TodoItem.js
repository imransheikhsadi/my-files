import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function TodoItem({item,removeItem}) {
 return(
    <TouchableOpacity onPress={()=>{removeItem(item)}} >
        <View style={styels.item}>
            <MaterialIcons name='delete' size={18} color='lightgray' />
            <Text style={styels.itemText}>{item.text}</Text>
        </View>
    </TouchableOpacity>
 )   
}

const styels = StyleSheet.create({
    item: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'lightcoral',
        padding: 10,
        borderRadius: 10,
        borderStyle: 'dashed',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemText: {
        paddingLeft: 10
    }
});

export default TodoItem;