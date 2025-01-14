import { configureStore } from "@reduxjs/toolkit";
import todoreducer from "./reducer";
import idreducer from "./idreducer";
const store=configureStore({
    reducer:{
        todos:todoreducer,
        id:idreducer
    }
})
export default store