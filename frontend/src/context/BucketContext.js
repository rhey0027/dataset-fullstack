import { createContext, useReducer } from 'react';

export const BucketsContext = createContext();

export const bucketsReducer = (state, action) => {
  switch(action.type) {
    case 'SET_BUCKETS':
      return { buckets: action.payload }
    case 'ADD_BUCKET':
      return { buckets: [ action.payload, ...state.buckets ]}
    case 'DELETE_BUCKET':
     return {
      buckets: state.buckets.filter((b) => b._id !== action.payload._id)
     }
     default: return state  
  }
}
export const BucketsContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(bucketsReducer, { buckets: null });


  return (
    <BucketsContext.Provider value={{...state, dispatch}}>
      { children }
    </BucketsContext.Provider>
  )
}
