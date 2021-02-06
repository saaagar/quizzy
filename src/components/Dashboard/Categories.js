import React, { useState,useEffect } from 'react'
import { Grid } from '@material-ui/core';
import CategoryItem from './CategoryItem';
import { Apps, Public, LocalLibrary,SportsSoccer, Adb, AccountBalance } from '@material-ui/icons';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actions';



const Categories = (props) => {

    const [selected, setSelected] = useState('any');
    const selectCategory = (cat_value) => {
        setSelected(cat_value);
    }
    useEffect(() => {
        props.setQuestionsCategory(selected);
    }, [props,selected])
   
    return (
        <>
            <Grid container spacing={2}>
                <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === 'any'}
                    icon={<Apps color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="Mixed"
                    categoryValue="any"
                />
                <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === '9'}
                    icon={<LocalLibrary color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="General"
                    categoryValue="9"
                />
                 <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === '22'}
                    icon={<Public color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="Geography"
                    categoryValue="22"
                />
                <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === '21'}
                    icon={<SportsSoccer color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="Sports"
                    categoryValue="21"
                />
                <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === '17'}
                    icon={<Adb color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="Science"
                    categoryValue="17"
                />
                 <CategoryItem
                    clicked={(cat)=>selectCategory(cat)}
                    isSelected={selected === '23'}
                    icon={<AccountBalance color="inherit" style={{ fontSize: 40 }} />}
                    categoryName="History"
                    categoryValue="23"
                />
            </Grid>
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        setQuestionsCategory: (category) => dispatch({ type: actionTypes.SELECTED_CATEGORY, selectedCategory: category })
    }
}

export default connect(null, mapDispatchToProps)(Categories);