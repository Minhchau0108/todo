import { createStore } from 'redux';


const initialState = {
    todos: [
        {id:1, text: 'Learn Redux', completed: false},
        {id:2, text: 'Make my teacher proud', completed: false},
    ],
    filters: {
        status: 'All',
        colors: []
    }
}
function findMaxId(todos){
    const maxId = todos.reduce((maxId, current) => Math.max(maxId, current.id), 0)
    return maxId;
}
const reducer = (state = initialState, action) => {

    if(action.type === 'addTodo'){
        return{
            ...state,
            todos: [...state.todos, {id: findMaxId(state.todos) + 1, text: action.payload, completed: false}],
        }
    }
    if(action.type === 'deleteTodo'){
        return{
            ...state,
            todos: state.todos.filter((t)=> t.id !== action.payload)
        }
    }
    if(action.type === 'completeCleared'){
        return{
            ...state,
            todos: state.todos.filter((t) => !t.completed)
        }
    }
    if(action.type === 'todoToggled'){
        return{
            ...state,
            todos: state.todos.map(t =>{
                if(t.id !== action.payload){return t}
                return {...t, completed: !t.completed}
            })
        }
    }

    if(action.type === 'colorSelected'){
        const {color, todoId} = action.payload
        return{
            ...state,
            todos: state.todos.map(t =>{
                if(t.id !== todoId){return t}
                return {...t, color}
            })
        }
    }

    if(action.type === 'allCompleted'){
        return{
            ...state,
            todos: state.todos.map(t => ({...t, completed: true}))
        }
    }

    if(action.type === 'colorFilterChanged'){
        let { color, changeType } = action.payload;
        const colors = state.filters.colors

        switch (changeType) {
            case 'added': {
              if (colors.includes(color)) {
                // This color already is set as a filter. Don't change the state.
                return {state}
              }
              return {
                ...state,
                filters:{
                    ...state.filters,
                    colors: state.colors.concat(color),
                }
              }
            }
            case 'removed': {
              return {
                ...state,
                filter:{
                    ...state.filters,
                    colors: state.filters.colors.filter((existingColor) => existingColor !== color )
                }
              }
            }
            default:
              return state
    }}
   
    if(action.type === 'statusFilterChanged'){
        return {
            ...state,
            filters:{
                ...state.filters, 
                status: action.payload
            }
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;