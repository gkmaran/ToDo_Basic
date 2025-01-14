const idreducer=(state=0,action)=>{
    if(action.type==='EDIT_TASK'){
        return action.payload.id
    }
    else if(action.type==='UPDATE_TASK'){
        return 0
    }
    return state
}
export default idreducer