import React from 'react'
import ControlSlider from './ControlSlider'
import ControlColorPicker from './ControlColorPicker'
import './Sidebar.css'

const Sidebar = function (props) {

  const valueModComponents = (valueMods) => {
    return valueMods.map(vm =>
      React.createElement(ControlSlider, {
        key: vm.id,
        controlLabel: vm.id,
        modValue: vm.value,
        onChange: (e) => props.handleModChange(vm.id, parseFloat(e))
      })
    )
  }

  const colorModComponents = (colorMods) => {
    return colorMods.map(cm =>
      React.createElement(ControlColorPicker, {
        key: cm.id,
        controlLabel: cm.id,
        modValue: cm.value,
        onChange: (e) => props.handleModChange(cm.id, e)
      })
    )
  }

  return (
    <div className={`sidebar`}>
      <div className={`section-header`}>Change Block</div>
      <div className={`section-body`}>
        <ControlSlider
          modValue={props.blockNumber}
          modValueMin="1"
          modValueMax={props.blocks.length}
          modValueStep="1"
          onChange={(e) => { props.handleBlockChange(e) }}
        />
      </div>

      <div className={`section-header`}>Change Style</div>
      <div className={`section-body`}>
        { valueModComponents(props.mods.filter(m => m.id.includes(`mod`)).sort()) }
        {<ControlColorPicker
          controlLabel="background"
          modValue={props.backgroundColor}
          onChange={(e) => { props.handleBackgroundChange(e) }}
        />}
        { colorModComponents(props.mods.filter(m => m.id.includes(`color`)).sort()) }
      </div>
    </div>
  );
}
export default Sidebar;