import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const availableColors = ['green', 'blue', 'orange', 'purple', 'red']
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

const RemainingTodos = ({ count }) => {
    const suffix = count === 1 ? '' : 's'
    return (
      <div className="todo-count">
        <h5>Remaining Todos</h5>
        <strong>{count}</strong> item{suffix} left
      </div>
    )
}
const ColorFilter = ({ value: colors, onChange }) => {
    const renderedColors = availableColors.map(color => {
        const checked = colors.includes(color)
        const handleChange = ()=>{
            const changeType = checked ? 'removed' : 'added'
            onChange(color, changeType)
        }
        return (
            <label key={color}>
              <input
                type="checkbox"
                name={color}
                check = {checked}
                onChange = {handleChange}
              />
              <span
                className="color-block"
                style={{
                  backgroundColor: color,
                }}
              ></span>
              {capitalize(color)}
            </label>
          )
    })
    return (
        <div className="filters colorFilters">
            <h5>Filter by Color</h5>
            <form className="colorSelection">{renderedColors}</form>
        </div>
    )
}



const Footer = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)
    const colors = useSelector((state) => state.filters.colors)

    const onMarkCompletedClicked = ()=>{
        dispatch({
            type: 'allCompleted'
        })
    }
    const onClearCompletedClicked = ()=>{
        dispatch({
            type: 'completeCleared'
        })
    }
    const todosRemaining = (todos) => {
        return todos.filter(t => t.completed===false).length;
    }
    const onColorChange = (color, changeType) =>
        dispatch({
        type: 'colorFilterChanged',
        payload: { color, changeType },
    })
    return (
        <footer className="footer">
            <div className="actions">
            <h5>Actions</h5>
                <button className="button" onClick={onMarkCompletedClicked}>Mark All Completed</button>
                <button className="button" onClick={onClearCompletedClicked}>Clear Completed</button>
            </div>
    
            <RemainingTodos count={todosRemaining(todos)} />
            <ColorFilter value={colors} onChange={onColorChange} />
        </footer>
    )
}

export default Footer
