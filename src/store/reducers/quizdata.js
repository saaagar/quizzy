import * as actionTypes from '../actions/actions';

const initialState = {
    selectedCategory: '',
    questionsCount: '5',
    difficultyLevel: 'any',
    answers: [],
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.selectedCategory,
            }
        case actionTypes.QUESTIONS_COUNT:
            return {
                ...state,
                questionsCount: action.questionsCount,
            }
        case actionTypes.DIFFICULTY_LEVEL:
            return {
                ...state,
                difficultyLevel: action.difficultyLevel
            }
        case actionTypes.ANSWERS:
           
            let old_arr=state.answers;
            old_arr.push(action.answers);
            return {
                ...state,
                answers: old_arr
            }
        default:
            return state;
    }
}

export default quizReducer;