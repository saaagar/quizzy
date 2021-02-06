import React, { useState, useEffect} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import QuizQuestion from './QuizQuestion';
import classes from './QuizMain.module.css';
import Results from './Results';
import Skeleton from '@material-ui/lab/Skeleton';
import {connect} from 'react-redux';

const QuizMain=(props)=> {
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [skipped, setSkipped] = useState(new Set());

    const [questions, setQuestions] = useState([]);


    const steps = questions;

    useEffect(()=>{
        let end_point='https://opentdb.com/api.php?amount='+props.questionsCount;
        if(props.selectedCategory!=='any'){
            end_point+='&category='+props.selectedCategory
        }
        if(props.difficultyLevel!=='any'){
            end_point+='&difficulty='+props.difficultyLevel
        }
        axios.get(end_point).then(res => {
            console.log(end_point);
            setQuestions(res.data.results);
        }).catch(err => {
            console.log(err.response);
        }).finally(() => {
            setLoading(false);
        })

    },[props.selectedCategory,props.questionsCount,props.difficultyLevel])
   
    


    const isStepOptional = (step) => {
        return step === 99;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };



    const getStepContent = (step) => {
        return questions[step];
    }
    if (isLoading) {
        return (
            <div className={classes.QuizQuestion}>
                <Skeleton variant="rect" height={40} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
            </div>
        )
    }
    else {
        return (
            <div>

                <div>
                    {activeStep === steps.length ? (
                       <Results />
                    ) : (
                            <div className={classes.QuizQuestion}>
                                <div >
                                    <QuizQuestion question={getStepContent(activeStep)} />
                                </div>
                                <div className={classes.Quiz__Buttons__Parent}>
                                    <div className={classes.QuizMain__Buttons}>
                                        <Button disabled={activeStep === 0} onClick={handleBack} >
                                            Back
                                    </Button>
                                        {isStepOptional(activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSkip}
                                            >
                                                Skip
                                            </Button>
                                        )}

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}

                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>


                            </div>
                        )}
                </div>

                {activeStep < steps.length && <div className={classes.Stepper__button}><Stepper activeStep={activeStep}>
                    {steps.map((question, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                           
                                <Step key={question.question} {...stepProps}>
                                    <StepLabel {...labelProps}></StepLabel>
                                </Step>
                           

                        );
                    })}
                </Stepper></div>}


            </div>
        );
    }

}

const mapStateToProps=state=>{
    return{
        selectedCategory:state.selectedCategory,
        questionsCount:state.questionsCount,
        difficultyLevel:state.difficultyLevel,
        answers:state.answers
    }
}

export default connect(mapStateToProps)(QuizMain);