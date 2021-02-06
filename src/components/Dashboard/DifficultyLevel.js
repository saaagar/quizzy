import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';

const DifficultyLevel=(props)=> {
    const [value, setValue] = useState('any');
    props.setDifficultyLevel(value);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Select the difficulty level</FormLabel>
                <RadioGroup aria-label="difficulty" name="difficulty" value={value} onChange={handleChange}>
                    <FormControlLabel value="any" control={<Radio />} label="Mixed" />
                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                </RadioGroup>
            </FormControl>
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setDifficultyLevel: (diffLvl) => dispatch({ type: actionTypes.DIFFICULTY_LEVEL, difficultyLevel: diffLvl })
    }
}

export default connect(null,mapDispatchToProps)(DifficultyLevel);
