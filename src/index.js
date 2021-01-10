import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import blocks from './blocks';
import CustomStyle from './CustomStyle';
import Sidebar from './components/Sidebar';

function App() {
  /*
  Wrapped Component required to make p5 demos compatible with EthBlock.art
  As a creative coder, in this file you can:
    - Swap between block data by changing `defaultBlockNumber` (1, 2 or 3)
    - Change the default background color `defaultBackgroundColor`
    - Dynamically add mods & colors in `defaultMods`
  For the rest, you can ignore this file, check CustomStyle.js
  */
  const defaultBlockNumber = 2;
  const defaultBackgroundColor = '#cccccc';

  /*
  Add and remove value/color mods here.
  Keep ids in line with naming convention. All lowercase.
  Value mods should be named `mod1`, `mod2`, `mod3`, ...
  Color mods should be named `color1`, `color2`, ...
  */
  const defaultMods = [
    { id: `mod1`, value: 0.75 },
    { id: `mod2`, value: 0.25 },
    { id: `mod3`, value: 0.25 },
    { id: `mod4`, value: 0.25 },
    { id: `color1`, value: `#ff0000` },
    { id: `color2`, value: `#00ff00` },
    { id: `color3`, value: `#0000ff` }
  ]

  const [blockNumber, setBlockNumber] = useState(defaultBlockNumber);
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [mods, setMods] = useState(defaultMods)

  const _onModChange = (modsSetFunction, id, val) => {
    defaultMods.find(m => m.id === id).value = val
    modsSetFunction(defaultMods)
  }

  const _modsAsAttributes = () => {
    return mods.reduce((acc, m) => {
      acc[m.id] = m.value
      return acc
    }, {})
  }


  const canvasRef = useRef();
  const attributesRef = useRef();
  const { ref, width, height } = useDimensions({});
  const _onCanvasResize = (p5) => {
    p5.resizeCanvas(width, height);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <div
          ref={ref}
          style={{
            margin: '0 auto',
            marginTop: '64px',
            width: '60vw',
            height: '60vw'
          }}
        >
          <p>EthBlock.art P5.js boilerplate</p>
          {width && height ? (
            <CustomStyle
              width={width}
              block={blocks[blockNumber-1]}
              height={height}
              canvasRef={canvasRef}
              attributesRef={attributesRef}
              handleResize={_onCanvasResize}
              background={backgroundColor}
              { ..._modsAsAttributes() }
            />
          ) : null}
        </div>
      </div>

      {<Sidebar
        blocks={blocks}
        blockNumber={blockNumber}
        mods={mods}
        backgroundColor={backgroundColor}
        handleBlockChange={(e) => setBlockNumber(e) }
        handleBackgroundChange={(e) => setBackgroundColor(e) }
        handleModChange={(id, val) => _onModChange(setMods, id, val)}
      />}
    </div>
  );
}

// export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
