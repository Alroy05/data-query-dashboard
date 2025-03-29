import {
  SUBMIT_QUERY,
  SET_RESULTS,
  SET_LOADING,
  SET_ERROR,
  ADD_TO_HISTORY,
  SET_AI_SUGGESTIONS
} from '../actions/queryActions';

const initialState = {
  currentQuery: '',
  results: null,
  loading: false,
  error: null,
  queryHistory: [],
  aiSuggestions: []
};

export default function queryReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_QUERY:
      return { ...state, currentQuery: action.payload };
    case SET_RESULTS:
      return { ...state, results: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case ADD_TO_HISTORY:
      return { 
        ...state, 
        queryHistory: [action.payload, ...state.queryHistory].slice(0, 10) 
      };
    case SET_AI_SUGGESTIONS:
      return { ...state, aiSuggestions: action.payload };
    default:
      return state;
  }
}