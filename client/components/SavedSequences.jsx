import React from 'react';
import Button from 'react-bootstrap/lib/Button';

var SavedSequences = (props) => {

  return (
    <div className="container">{props.loggedIn ? 'Saved sequences...click ID# to load, click share button to share' : ''}
    <ul>
      {
        props.savedSequences.map( (sequence, index) => {
          var linkOrShare = sequence.shareable ?
            (<a key={index} href={`/users/${sequence.user}/${sequence._id}`}>Shareable Link</a>) :
            (<Button key={index} bsStyle="primary" bsSize="small" onClick={()=>{props.shareClicked(index)}}>share</Button>);
          return (
            <div>
              <span>
                <li key={index}
                    onClick={() => {props.loadSavedSequence(index)}}
                >{JSON.stringify(sequence._id)}
                </li>
              </span>
              <span>
                {linkOrShare}
              </span>
            </div>
          )
        })
      }
    </ul>
    </div>
  );
};

export default SavedSequences;
