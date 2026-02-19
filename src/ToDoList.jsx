import Task from "./Task";
import { memo } from "react";

const ToDoList = ({tasks}) => {
    // console.log('rerender ToDoList')
return <div className="tasks">
    {tasks.length === 0 && <h3>Добавь задачу, которую нужно выполнить </h3>}
{tasks.map(item => <Task key={item.id} task={item}/>)}
</div>
}

export default memo(ToDoList)