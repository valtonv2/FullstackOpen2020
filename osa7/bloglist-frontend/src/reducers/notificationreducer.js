

//ACTION CREATORS

export const notify = (content, error, time) => {
    return async (dispatch) => {
        const timer = setTimeout(() => dispatch({type: 'HIDE'}), time)
        dispatch({type: 'DISPLAY', data: {content, error, timer}})
    }
}


const notificationreducer = (state = {content: '', error: false, timer: null}, action) => {

    switch (action.type){
        case 'DISPLAY':
            if(state.timer) clearTimeout(state.timer)
            return action.data

        case 'HIDE':
            return {content: '', error: false}
        
        default: 
            return state
        
    }

}

export default notificationreducer