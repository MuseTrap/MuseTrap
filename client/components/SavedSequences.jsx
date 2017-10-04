import React from 'react';
import Button from 'react-bootstrap/lib/Button';

var SavedSequences = (props) => {

  return (
    <div id="savedSequences" >{props.loggedIn ? 'Your Saved Sequences' : ''}
      {
        props.savedSequences.map( (sequence, index) => {
          var linkOrShare = sequence.shareable ?
            (<a key={index} href={`/users/${sequence.user}/${sequence._id}`}>Shareable Link</a>) :
            (<Button key={index} bsStyle="primary" bsSize="small" onClick={()=>{props.shareClicked(index)}}>Share</Button>);
          return (
            <div key={index}>
              <span>
                {JSON.stringify(sequence._id)}
                <Button
                  key={index}
                  bsStyle="primary"
                  bsSize="small"
                  style={{margin: '10px 15px'}}
                  onClick={() => {props.loadSavedSequence(index)}}
                > Load
              </Button>
              </span>
              <span>
                {linkOrShare}
              </span>
            </div>
          )
        })
      }
    </div>
  );
};

export default SavedSequences;
