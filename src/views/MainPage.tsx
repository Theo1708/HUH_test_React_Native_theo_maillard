import { ScrollView, Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { selectToDoList, createTask, selectFilterIndex } from '../store/slices/toDoListSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import Task from '../components/Task';
import ProgressCard from '../components/ProgressCard';
import Filter from '../components/Filter';

import Colors from '../styles/colors';

import { FILTER_LIST } from '../components/Filter';

export default function MainPage() {
	const dispatch = useAppDispatch();
    const toDoList = useAppSelector(selectToDoList)

	const filterFunction = FILTER_LIST[useAppSelector(selectFilterIndex)]['filter']

    const [newTask, setNewTask] = useState<string>('')
    const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(false)

    const createHandler = () => {
        if (newTask === '') {
            Alert.alert('Missing title', `Please input title before submitting`)
        } else {
            setNewTask('')
            dispatch(createTask(newTask))
        }
		setIsAddButtonVisible(false)
    }

	const changeTextHandler = (text : string) => {
		setNewTask(text)
		if (text) {
			setIsAddButtonVisible(true)
		} else {
			setIsAddButtonVisible(false)
		}
	}

    return (
		<SafeAreaView style={{flex:1}}>
			<KeyboardAvoidingView 
				behavior='padding'
				keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
				style={styles.container}
			>
				<ProgressCard toDoList={toDoList}/>
				<View style={styles.header}>
					<Text style={styles.title}>
						Tasks
					</Text>
					<Filter/>
				</View>
				<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
					{toDoList.filter(filterFunction).map((task) => (
						<Task
							id={task.id}
							key={task.id}
							title={task.title}
							completed={task.completed}
						/>
					))}
				</ScrollView>				
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.taskInput}
						placeholder={'Add a new task...'}
						onChangeText={(text) => {changeTextHandler(text)}}
						defaultValue={newTask}
						hitSlop={{left : 20, top : 10, bottom : 10}}
						selectionColor={Colors.BLACK}
					/>
					{ isAddButtonVisible ?
						<Pressable onPress={createHandler} hitSlop={20}
						>
							{({pressed})=>
								<View style = {[styles.addButton, {backgroundColor : pressed ? Colors.GREY : undefined}]}>
									<Text style={styles.addText}>Add</Text>
								</View>
							}
						</Pressable>
						:
						null
					}
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
		flex : 1,
        marginVertical : 10,
		marginHorizontal : 15,
		backgroundColor : Colors.CARD_BACKGROUND,
		justifyContent : 'space-between'
    },
	header : {
		flexDirection : 'row',
		justifyContent : 'space-between',
		alignItems : 'center',
		marginTop : 25,
		marginBottom : 10,
		marginHorizontal : 10,
		zIndex : 1
	},
	title : {
		fontSize : 30,
		fontWeight : '600'
	},
	inputContainer : {
        width : '100%',
		height : 40,
		flexDirection : 'row',
		justifyContent : 'space-between',
		padding : 5,
		marginTop : 10,
		borderRadius : 1000,
		backgroundColor : Colors.WHITE,
		borderWidth : 0.5,
		borderColor : Colors.GREY,
		shadowColor : Colors.BLACK,
		shadowOffset : {
			width : 3,
			height : 3,
		},
		shadowRadius : 2,
		shadowOpacity : 0.2
	},
    taskInput : {
		flex : 1,
		fontSize : 15,
		borderRadius : 1000,
		paddingLeft : 10
	},
	addButton : {
		borderWidth : 0.5,
		borderColor : Colors.BLACK,
		borderRadius : 1000,
		height : 30,
		width : 50,
		justifyContent : 'center',
		alignItems : 'center'
	},
	addText : {
		fontSize : 15
	}
})