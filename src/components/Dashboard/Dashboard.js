import React, { useState,useEffect } from 'react'
import Categories from './Categories'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import QuestionCount from './QuestionCount';
import DifficultyLevel from './DifficultyLevel'
import classes from './Dashboard.module.css';
import QuizMain from '../QuizMain/QuizMain';
import {connect} from 'react-redux';


function getSteps() {
    return ['Categories', 'Questions', 'Difficulty'];
}
function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Categories />;
        case 1:
            return <QuestionCount />;
        case 2:
            return <DifficultyLevel />;
        default:
            return 'Error';
    }
}
const Dashboard=(props)=> {
    const [activeStep, setActiveStep] = useState(0);
    const [btnStatus,setBtnStatus]=useState(true);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(()=>{
        if(props.selectedCategory===''){
            setBtnStatus(true);
        }
        else{
            setBtnStatus(false);
        }
    },[props.selectedCategory])
    
    return (
        <>

            <div className={classes.Stepper}>
                {activeStep<3 && <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>}
                <div className={classes.Stepper__body}>
                    {activeStep === steps.length ? (
                        <div>
                            <QuizMain/>
                        </div>
                    ) : (
                            <>
                            
                                <div className={classes.Categories__content}>
                                    {getStepContent(activeStep)}
                                </div>


                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                     </Button>
                                <Button disabled={btnStatus}  variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Start Quiz' : 'Next'}
                                </Button>

                            </>
                        )}
                </div>
            </div>


        </>
    )
}

const mapStateToProps=state=>{
    return {
        selectedCategory:state.selectedCategory,
    }
}
export default connect(mapStateToProps)(Dashboard);
