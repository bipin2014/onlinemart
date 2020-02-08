import React from 'react'
import './style.css'

const RadioButton = (props) => {
    return (
        <label class="container">{props.label}
            <input id={props.id} onChange={props.changed} name={props.name} value={props.value} type="radio" checked={props.isSelected}/>
            <span class="checkmark"></span>
        </label>
    )
}

export default RadioButton;
