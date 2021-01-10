import React from 'react';

const ControlColorPicker = function (props) {
    const handleColorChange = event => {
        props.onChange(event.target.value)
    }

    return (
        <div style={{'margin': '5px 0', 'fontSize': '11px'}}>
            <label style={{'display': 'block', 'marginBottom': '4px' }}>{props.controlLabel}</label>
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