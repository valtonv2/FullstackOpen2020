const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  average: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      state = {...state, good: state.good+1, all: state.good+1+state.ok+state.bad, average: (state.good+1-state.bad)/(state.all+1)}
      return state
    case 'OK':
      state = {...state, ok: state.ok+1, all: state.good+state.ok+1+state.bad, average: (state.good-state.bad)/(state.all+1)}
      return state
    case 'BAD':
      state = {...state, bad: state.bad+1, all: state.good+state.ok+state.bad+1, average: (state.good-(state.bad+1))/(state.all+1)}
      return state
    case 'ZERO':
      state = {good: 0, ok: 0, bad: 0, all: 0, average: 0}
      return state
    default: return state
  }
  
}

export default counterReducer