import {useEffect} from 'react';

const GoBack = (props) =>{

    useEffect(()=>{
        props.history.goBack();
    },[])

    return null;
}

export default GoBack;