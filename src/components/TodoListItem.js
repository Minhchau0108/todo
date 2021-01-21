import React from 'react'
import { useDispatch} from 'react-redux'



const TodoListItem = ({id, text, completed, color}) => {
    const availableColors = ['green', 'blue', 'orange', 'purple', 'red']
    const capitalize = (s) => s[0].toUpperCase() + s.slice(1)


    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch({
            type: "deleteTodo",
            payload: id
        })
    }

    const handleCompletedChanged = ()=>{
        dispatch({
            type: 'todoToggled',
            payload: id
        })
    }
    const handleColorChanged = (e) => {
        const color = e.target.value
        dispatch({
          type: 'colorSelected',
          payload: { todoId: id, color },
        })
      }

    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
          {capitalize(c)}
        </option>
    ))
    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={handleCompletedChanged}
                    />
                    <div className="todo-text">{id}  {text}  {completed}</div>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                        value={color}
                        style={{ color }}
                        onChange={handleColorChanged}>
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button onClick={handleClick}><span role="img" aria-label="delete">❌</span></button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
