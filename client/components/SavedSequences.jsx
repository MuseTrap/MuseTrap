import React from 'react';

var SavedSequences = props => {
  return (
    <div id="savedSequences">
      {props.loggedIn ? 'Your Saved Sequences' : ''}
      {props.savedSequences.map((sequence, index) => {
        var linkOrShare = sequence.shareable ? (
          <a key={index} href={`/users/${sequence.user}/${sequence._id}`}>
            Shareable Link
          </a>
        ) : (
          <button
            key={index}
            onClick={() => {
              props.shareClicked(index);
            }}>
            Share
          </button>
        );
        return (
          <div key={index}>
            <span>
              {JSON.stringify(sequence._id)}
              <button
                key={index}
                // bsStyle="primary"
                // bsSize="small"
                style={{ margin: '10px 15px' }}
                onClick={() => {
                  props.loadSavedSequence(index);
                }}>
                {' '}
                Load
              </button>
            </span>
            <span>{linkOrShare}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SavedSequences;
