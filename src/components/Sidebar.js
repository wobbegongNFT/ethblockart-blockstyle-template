import React from 'react'
import ControlSlider from './ControlSlider'
import ControlColorPicker from './ControlColorPicker'
import './Sidebar.css'

const Sidebar = function (props) {

  const createModComponents = (mods) => {
    return mods.map(mod =>
      React.createElement(mod.id.includes(`color`) ? ControlColorPicker : ControlSlider, {
        key: mod.id,
        controlLabel: mod.id,
        modValue: mod.value,
        onChange: (e) => props.handleModChange(mod.id, e)
      })
    )
  }

  return (
    <div className="sidebar">
      <div className="section-header">Change Block</div>
      <div className="section-body">
        <ControlSlider
          modValue={props.blockNumber}
          modValueMin="1"
          modValueMax={props.blocks.length}
          modValueStep="1"
          onChange={(e) => { props.handleBlockChange(e) }}
        />
      </div>

      <div className="section-header">Change Style</div>
      <div className="section-body">
        { createModComponents(props.mods) }
        {<ControlColorPicker
          controlLabel="background"
          modValue={props.backgroundColor}
          onChange={(e) => { props.handleBackgroundChange(e) }}
        />}
      </div>

      <div className="section-header">Custom Attributes</div>
      <div className="section-body">
        {props.customAttribs.attributes ?
          props.customAttribs.attributes.map( (attribute, index) => {
            return <div className="customAttribute">
              <div className="content-header">{attribute.trait_type}</div>
              <div>{attribute.value}</div>
            </div>
          }) : ''}
      </div>
    </div>
  );
}
export default Sidebar;