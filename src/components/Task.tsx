import { Text, TextInput, View, StyleSheet, Pressable, Alert } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

import { useState, useRef, useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { editTask, deleteTask } from '../store/slices/toDoListSlice';

import Colors from '../styles/colors';

export default function Task (props : {title : string, completed : boolean, id : string })  {
    const dispatch = useAppDispatch();
    
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)
    const newTitleRef = useRef<TextInput>(null)

    const deleteHandler = () => {
        dispatch(deleteTask(props.id))
    }

    const editHandler = (title : string, completed : boolean) => {
        if (title === '') {
            Alert.alert('Missing title', 'Please input a title before submitting')
        } else {
            const task = {
                id : props.id,
                title,
                completed 
            }
            dispatch(editTask(task))
            setIsEditing(false)
        }
    }

    useEffect(() => {
        if (newTitleRef.current) {
          newTitleRef.current.focus();
        }
    }, [isEditing]);

    return (
        <Pressable style={styles.container}>
            {isEditing ?
                <>
                    <TextInput
                        ref={newTitleRef}
                        placeholder={'Input new title...'}
                        style={styles.editInput}
                        defaultValue={newTitle}
                        onChangeText={(text) => {setNewTitle(text)}}
                        selectionColor={Colors.BLACK}
                    />
                    { newTitle ?
                        <Pressable onPress={() => editHandler(newTitle, props.completed)}>
                            {({pressed})=>
                                <View style = {[styles.editButton, {backgroundColor : pressed ? Colors.GREY : undefined}]}>
                                    <Text style={styles.editText}>Edit</Text>
                                </View>
                            }
                        </Pressable>
                        :
                        null
                    }
                </>
                :
                <>
                    <Pressable onPress={() => {editHandler(props.title, !props.completed)}} hitSlop={25}>
                        {({pressed}) => 
                            <View style = {[styles.checkIcon, {backgroundColor : pressed ? Colors.GREY : props.completed ? Colors.BLACK : undefined}]}>
                                <AntDesign name="check" size={17} color={Colors.WHITE} />
                            </View>
                        }
                    </Pressable>
                    <Text style={{flex : 1, fontSize : 15}}>{props.title}</Text>
                    <Pressable onPress={()=> setIsEditing(true)} hitSlop={25}>
                        <EvilIcons name="pencil" size={30} color="black" />
                    </Pressable>
                    <Pressable style={styles.deleteIcon} onPress={deleteHandler}>
                        <EvilIcons name="trash" size={30} color="black" />
                    </Pressable>
                </>
                }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        paddingRight : 5,
        paddingLeft : 10,
        paddingVertical : 5,
        marginVertical : 6,
        minHeight : 45,
        borderRadius : 1000,
        backgroundColor : Colors.WHITE,
		borderWidth : 0.5,
		borderColor : Colors.GREY,
    },
    checkIcon : {
        justifyContent : 'center',
        alignItems : 'center',
        width : 22,
        height : 22,
        borderRadius : 1000,
        borderWidth : 1,
        borderColor : Colors.BLACK,
        marginRight : 7
    },
    editInput : {
        flex : 1, 
        fontSize : 15,
        marginLeft : 5,
    },
    editButton : {
		borderWidth : 0.5,
		borderColor : Colors.BLACK,
		borderRadius : 1000,
		height : 30,
		width : 50,
		justifyContent : 'center',
		alignItems : 'center'
	},
	editText : {
		fontSize : 15
	},
    deleteIcon : {
        marginRight : 5,
        marginLeft : 5
    }
})