import React from 'react';

class Post extends React.Component {
  render() {
    return(
      <div>
        <h2>{this.props.title}</h2>
        <div>{this.props.body}</div>
      </div>
    );
  }
}

export default Post;