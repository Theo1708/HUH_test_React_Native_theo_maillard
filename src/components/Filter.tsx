import { View, Pressable, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeFilterIndex, selectFilterIndex } from '../store/slices/toDoListSlice';

import { EvilIcons } from '@expo/vector-icons';
import Colors from '../styles/colors';

export const FILTER_LIST : Filter[] = [
    {
        name : 'All',
        filter : (task : SingleTask) => {return true}
    },
    {
        name : 'Done',
        filter : (task : SingleTask) => {return task.completed}
    },
    {
        name : 'Undone',
        filter : (task : SingleTask) => {return !task.completed}
    }
]

export default function Filter () {
    const dispatch = useAppDispatch()
    const filterName = FILTER_LIST[useAppSelector(selectFilterIndex)].name

    const [isFilterListVisible, setIsFilterListVisible] = useState<boolean>(false)
    
    const choseFilter = (index : number) => {
        dispatch(changeFilterIndex(index))
    }

    const Filter = (props : {item : Filter, index : number}) => (
        <Pressable onPress={() => {choseFilter(props.index), setIsFilterListVisible(false)}} hitSlop={10}>
            {({pressed}) =>
                <View style={[styles.flatListElement, {backgroundColor : filterName === props.item.name || pressed ? Colors.GREY: undefined}]}>
                    <Text>{props.item.name}</Text>
                </View>
            }
        </Pressable>
    );

    return (
        <>
            <Pressable onPress={() => {setIsFilterListVisible(!isFilterListVisible)}} hitSlop={15}>
                {({pressed}) =>
                    <View style = {[styles.container, {backgroundColor : pressed ? Colors.GREY : Colors.WHITE}]}>
                        <Text style={styles.filterName}>{filterName}</Text>
                        <EvilIcons name="chevron-down" size={28} color="black" />
                    </View>
                }
            </Pressable>
            { isFilterListVisible?
                <FlatList
                    style={styles.flatList}
                    data={FILTER_LIST}
                    renderItem={({item, index}) => <Filter item={item} index={index} />}
                    bounces={false}
                />
                :
                null
            }
        </>
    )
    
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
		height : 35,
        width : 130,
        paddingLeft : 13,
        paddingRight : 5,
        borderRadius : 10,
        borderWidth : 0.5,
        borderColor : Colors.BLACK,
    },
    filterName : {
        fontWeight : '500',
    },
    flatList : {
        width : 130,
        backgroundColor : Colors.WHITE,
        borderRadius : 10,
        borderWidth : 0.5,
        borderColor : Colors.BLACK,
        position : 'absolute',
        right : 0,
        top : 40,
        paddingHorizontal : 7,
        paddingVertical : 5
    },
    flatListElement : {
        justifyContent : 'center',
        height : 30,
        borderRadius : 8,
        paddingLeft : 7,
        marginVertical : 5
    }
})