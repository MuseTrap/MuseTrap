import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';


var SampleLibrary = (props) => {
  var color1 = props.samplesOnTheBoard[0];
  var color2 = props.samplesOnTheBoard[1];
  var color3 = props.samplesOnTheBoard[2];
  var color4 = props.samplesOnTheBoard[3];

  return (
    <Grid id="sampleLibrary">
      <div className="center whiteFont" style={{paddingBottom: '20px'}}> Double click on a sound to add it to the sound board.</div>
      <Row className="show-grid">
        <Col xs={12} sm={8} smOffset={2} sm={6} smOffset={3} className={'center'}>
        {
          props.samples.map( (sound, index) => {
            return (
              <div key={index} >
                <Col xs={3}>
                  <Button
                    bsStyle="default"
                    className={
                      color1 === index ? "color1 color1-pulse btnPulseOnce sampleLibraryBtn" :
                      color2 === index ? "color2 color2-pulse btnPulseOnce sampleLibraryBtn" :
                      color3 === index ? "color3 color3-pulse btnPulseOnce sampleLibraryBtn" :
                      color4 === index ? "color4 color4-pulse btnPulseOnce btnPulseOnce sampleLibraryBtn" :
                      "sampleLibraryBtn"
                    }
                    onClick={() => { props.playSample(index)}}
                    onDoubleClick={() => {props.registerSample(index)}}>
                  </Button>
                  <div className={'center, whiteFont'}>{sound.name.toUpperCase()}</div>
                </Col>
              </div>
            )
          })
        }
      </Col>
      </Row>
    </Grid>
  );
};

export default SampleLibrary;
