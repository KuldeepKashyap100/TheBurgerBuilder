const updatedObject = (state,updatedState)=>{
    return {
        ...state,
        ...updatedState
    };
};

export default updatedObject;