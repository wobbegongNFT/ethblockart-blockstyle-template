import React from 'react';
import './ControlColorPicker.css'

const ControlColorPicker = function (props) {
    const handleColorChange = event => {
        props.onChange(event.target.value)
    }

    return (
        <div class="control-color-picker" style={{}}>
            <label>{props.controlLabel}</label>
            <input
                id="controlColorPicker"
                type="color"
                defaultValue={props.modValue}
                onInput={handleColorChange}
            />
        </div>
    );
}
export default ControlColorPicker;