import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {signInBtnIsClicked} from "../actions/nav";

const GoBack = (props) =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        props.history.goBack();
    },[])

    return null;
}

export default GoBack;