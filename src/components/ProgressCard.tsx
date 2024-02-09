import { Text, View, StyleSheet } from 'react-native';

import Colors from '../styles/colors';

export default function ProgressCard (props : {toDoList : ToDoList})  {
    const completedTotal = props.toDoList.filter(task => task.completed === true).length
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Progress
            </Text>
            <View style={styles.bar}>
                <View style={[styles.barFilling, {width : `${100*completedTotal/props.toDoList.length}%`}]}/>
            </View>
            <Text style={styles.subtitle}>
                {completedTotal} completed
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.PROGRESS_CARD_BACKGROUND,
        borderRadius : 10,
        paddingHorizontal : 15,
        paddingVertical : 10,
        gap : 10
    },
    title : {
        fontSize : 20,
        fontWeight : '600',
        color : Colors.WHITE
    },
    bar : {
        backgroundColor : Colors.BLACK,
        height : 5,
        borderRadius : 1000
    },
    barFilling : {
        backgroundColor : Colors.WHITE,
        height : '100%',
        borderRadius : 1000
    },
    subtitle : {
        fontSize : 10,
        fontWeight : '300',
        color : Colors.WHITE
    }
})