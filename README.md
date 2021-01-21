### Action (object)
- type
- payload

### Reducer (acts like eventListener --> hear action and update state)
- state: (previousState)
- action 


### Store
- dispatch(action): trigger event --> Thực hiện gọi 1 action

- Create Store by createStore(reducer)  // parameter is reducer

### Selectors --> functions to extract specific pieces of information from a store state value


### Redux Data Flow
## Initial
1. create Store using a reducer function
2. Store call reducer once --> save return values as its initial state
3. UI first render (based on current State to decide what to render)
4. UI subscribe to any future state update 

## Update
1. Trigger event --> dispatch an action to Redux Store
2. Store runs reducer funtion again (with previous state and action) --> return a value as new state
3. The store notifies all parts of the UI that are subscribes that the store to update
4. Each UI component that needs data from stores checks to see if the parts of state they need have changes
5. Each components that sees its data changed --> forced re-render again 
