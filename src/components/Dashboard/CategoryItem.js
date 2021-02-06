import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core';
import classes from './Dashboard.module.css'


export default function CategoryItem(props) {
    const [pElevation, setElevation] = useState(1);
    const hoverPaper = (elevation) => {
        setElevation(elevation)
    }
    return (
        <Grid item lg={4} md={4} sm={4} xs={6}>
            <Paper onClick={()=>props.clicked(props.categoryValue)}  className={props.isSelected?classes.Category__active:''} elevation={pElevation} onMouseEnter={() => hoverPaper(4)} onMouseLeave={() => hoverPaper(1)}>
                <div className={classes.CategoryItem}>
                    <p>{props.icon}</p>
                    {props.categoryName}
                </div>
            </Paper >
        </Grid>
    )
}
