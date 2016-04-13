import * as React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommentBox from '../components/CommentBox';
import { fetchComments, createComment } from '../actions/comments';

/**
 * CommentBoard
 */
class CommentBoard extends Component<{ 
    comments: any[],
    onMount: () => void,
    onSubmit: (comment: { author: string, text: string }) => void 
}, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onMount();
    }
    render() {
        return (
            <CommentBox comments={ this.props.comments } onSubmit={ this.props.onSubmit } />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comment.comments
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
        if (!window["__INITIAL_STATE__"]["comment"]["isLoaded"])
            CommentBoardWrap["need"].forEach((val) => dispatch(val()));
    },
    onSubmit: (comment) => {
        console.log(`author: ${comment.author}, text: ${comment.text}`);
        dispatch(createComment(comment));
    }
  }
}

const CommentBoardWrap = connect(mapStateToProps, mapDispatchToProps)(CommentBoard);

CommentBoardWrap["need"] = [fetchComments];

export default CommentBoardWrap;
// export default connect(mapStateToProps)(CommentBoard)

