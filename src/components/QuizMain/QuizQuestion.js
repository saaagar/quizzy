import React, { useState, useEffect,useMemo } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';


const QuizQuestion=(props)=> {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(props.question.incorrect_answers);
        setOptions(oldArray => [...oldArray, props.question.correct_answer])
    }, [props.question.correct_answer, props.question.incorrect_answers]);

  
    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const shuffled=useMemo(()=>{
        return shuffle(options);
    },[options]);

    let display_options = null;
    if (shuffled.length > 0) {
        display_options = shuffled.map(option => {
            return (
                <FormControlLabel key={option} value={option} control={<Radio />} label={<span dangerouslySetInnerHTML={{ __html: option }}></span>} />
            )
        })
    }
    const isCorrect=(answer,correct_ans)=>{
        if(answer===correct_ans){
            return true;
        }
        else{
            return false;
        }
    }
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        props.setAnswer({
            question:props.question.question,
            all_options:shuffled,
            isCorrect:isCorrect(event.target.value,props.question.correct_answer),
            user_answer:event.target.value,
            correct_answer:props.question.correct_answer
        });

    };

    return (
        <div>
            <h1 dangerouslySetInnerHTML={{ __html: props.question.question }} />
            <FormControl component="fieldset">
                <FormLabel component="legend">Category: {props.question.category}</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    {display_options}
                </RadioGroup>
            </FormControl>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setAnswer: (answer) => dispatch({ type: actionTypes.ANSWERS, answers: answer })
    }
}
export default connect(null,mapDispatchToProps)(QuizQuestion);