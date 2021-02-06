import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';



const Results = (props) => {
    let result = null;
    const [correct_ans, setCorrectAns] = useState(0);
    //console.log(props.answers);
    if (props.answers.length > 0) {
        result = props.answers.map(el => {
            let options = null;
            if (el.all_options.length > 0) {
                options = el.all_options.map(op => {
                    return (<li key={op}>
                        <span dangerouslySetInnerHTML={{ __html: op }} />
                        {op === el.user_answer ? ' 👈 ' : null}
                        {op === el.correct_answer ? ' ✅ ' : null}
                    </li>)
                })
            }
            return (
                <li key={el.question} style={{ color: el.isCorrect ? 'green' : 'red' }}>
                    <span dangerouslySetInnerHTML={{ __html: el.question }} /><br />
                    <ol type="a">
                        {options}
                    </ol>
                </li>
            );
        })
    }

    useEffect(() => {
        let c_ans = props.answers.filter(el => {
            return el.isCorrect === true
        });
        setCorrectAns(c_ans.length);
    }, [props.answers])
    if (props.answers.length > 0) {
        return (
            <div>
                <h4 style={{ textAlign: 'center' }}>Results</h4>
                <Paper>
                    <h4 style={{ textAlign: 'center' }}>YOUR SCORE</h4>
                    <h4 style={{ textAlign: 'center' }}>{correct_ans}/{props.answers.length}</h4>
                </Paper>
                <ol>
                    {result}
                </ol>
            </div>
        )
    }
    else {
        return (
            <>
                <Skeleton variant="rect" height={40} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
            </>
        )
    }

}
const mapStateToProps = state => {
    return {
        answers: state.answers
    }
}
export default connect(mapStateToProps)(Results);
