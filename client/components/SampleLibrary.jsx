import React from 'react';
import SampleSound from './SampleSound.jsx';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


var SampleLibrary = (props) => {
  console.log("PROPS", props);
  return (

    <div className="container">
    <Grid>
      <Row className="show-grid">
        {
          props.samples.map( (sound, index) => {
            console.log('SOUND', sound);
            return <div key={index} >
              <Col xs={3} md={4} onClick={() => {props.sampleClick(index)}}>{sound.name}</Col>
            </div>
          })
        }
      </Row>
    </Grid>
    </div>
  );
};

export default SampleLibrary;
