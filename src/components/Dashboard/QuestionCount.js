import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';


const QuestionCount=(props)=>{
    const [value, setValue] = useState('5');
    props.setQuestionsCount(value);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Select the number of questions</FormLabel>
                <RadioGroup aria-label="question_count" name="question_count1" value={value} onChange={handleChange}>
                    <FormControlLabel value="5" control={<Radio />} label="5 Questions" />
                    <FormControlLabel value="10" control={<Radio />} label="10 Questions" />
                    <FormControlLabel value="15" control={<Radio />} label="15 Questions" />
                    <FormControlLabel value="20" control={<Radio />} label="20 Questions" />
                </RadioGroup>
            </FormControl>
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setQuestionsCount: (questionsCount) => dispatch({ type: actionTypes.QUESTIONS_COUNT, questionsCount: questionsCount })
    }
}

export default connect(null,mapDispatchToProps)(QuestionCount);