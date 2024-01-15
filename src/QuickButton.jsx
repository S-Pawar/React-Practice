import React from 'react';


const QuickButton = (props) => {
    function handleQuickButton(){
        props.onQuickButtonClick(props.Name);

    }
   

    return (
        <div onClick={handleQuickButton}>{props.Name}</div>
        
    )

}
export default QuickButton;