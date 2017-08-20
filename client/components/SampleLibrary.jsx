import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


var SampleLibrary = (props) => {
  return (
    <div className="container">
    <Grid>
      <Row className="show-grid">
        {
          props.samples.map( (sound, index) => {
            return <div key={index} >
              <Col
                xs={3}
                md={4}
                onClick={() => {props.playSample(index)}}
                onDoubleClick={() => {props.addSample(index)}}
              >
                {sound.name}
              </Col>
            </div>
          })
        }
      </Row>
    </Grid>
    </div>
  );
};

export default SampleLibrary;
