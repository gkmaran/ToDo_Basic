const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    input: '',
  };
const todoreducer=(state=initialState,action)=>{
    if(action.type==='ADD_TASK'){
        return {...state,todos:[...state.todos,action.payload],input:""}
    }
    else if(action.type=='DELETE_TASK'){
        return { ...state, todos: state.todos.filter((item) => item.id !== action.payload) };
    }
    else if(action.type==='TOGGLE_ITEM'){
        return {...state ,todos: state.todos.map(item=>item.id===action.payload ? {...item,is_completed:!item.is_completed} :item)}
    }
    else if(action.type==='SET_INPUT'){
        return {...state,input:action.payload}
    }
    else if(action.type==='EDIT_TASK'){
        return{...state ,input:action.payload.name}
    }
    else if(action.type==='UPDATE_TASK'){
        return{...state ,todos:state.todos.map(item=>item.id===action.payload.id ? action.payload :item),input:''}
    }
    return state
}
export default todoreducer