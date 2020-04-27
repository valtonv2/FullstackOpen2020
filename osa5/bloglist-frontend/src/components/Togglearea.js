import React, {useState} from 'react'
const Togglearea = (props) => {

    const [isVisible, setVisibility] = useState(false)

    const showWhenInvisible = {display: isVisible ? 'none': ''}
    const showWhenVisible = {display: isVisible ? '': 'none'}

    const toggleVisibility = () => setVisibility(!isVisible)


    return(
        <div>
            <button onClick = {toggleVisibility} style = {showWhenInvisible}>{props.buttonLabel}</button>
            <div style = {showWhenVisible}>
                {props.children}
                <button onClick = {toggleVisibility}>cancel</button>
            </div>
        </div>


    )



}

export default Togglearea