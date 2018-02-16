import React from 'react';

var SampleLibrary = props => {
  var color1 = props.samplesOnTheBoard[0];
  var color2 = props.samplesOnTheBoard[1];
  var color3 = props.samplesOnTheBoard[2];
  var color4 = props.samplesOnTheBoard[3];
  var row = 1;

  return (
    <div id="sampleLibrary">
      <div className="center whiteFont" style={{ padding: '20px' }}>
        {' '}
        Double click on a sound to add it to the sound board.
      </div>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div className="center wrapper">
          {props.samples.map((sound, index) => {
            let col = index + 1;
            if (col > 4) {
              row += 1;
              col = (index + 1) % 4;
            }
            return (
              <div key={index} style={{ gridColumn: col / row }}>
                <span>
                  <button
                    className={
                      color1 === index
                        ? 'color1 color1-pulse btnPulseOnce sampleLibraryBtn'
                        : color2 === index
                          ? 'color2 color2-pulse btnPulseOnce sampleLibraryBtn'
                          : color3 === index
                            ? 'color3 color3-pulse btnPulseOnce sampleLibraryBtn'
                            : color4 === index
                              ? 'color4 color4-pulse btnPulseOnce btnPulseOnce sampleLibraryBtn'
                              : 'sampleLibraryBtn'
                    }
                    onClick={() => {
                      props.playSample(index);
                    }}
                    onDoubleClick={() => {
                      props.registerSample(index);
                    }}
                  />
                  <div className={'center, whiteFont'}>
                    {sound.name.toUpperCase()}
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SampleLibrary;
