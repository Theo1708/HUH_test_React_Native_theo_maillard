interface toDoListState {
    toDoList : ToDoList
}

type ToDoList = SingleTask[]

interface SingleTask {
    id : string,
    title : string,
    completed : boolean
}