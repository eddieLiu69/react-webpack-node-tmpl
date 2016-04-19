/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';

interface ICommentProps extends React.Props<any>, React.HTMLAttributes {
    key: number;
    author: string;
    text?: string;
}

class CommentForm extends React.Component<{ onCommentSubmit: (comment: { author: string, text: string }) => void }, any> {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
    }

    handleAuthorChange = (e) => this.setState({ author: e.target.value });

    handleTextChange = (e) => this.setState({ text: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({ author: author, text: text });

        this.setState({ author: '', text: '' });
    };

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    />
                <input type="submit" value="Post" />
                </form>
        );
    }
}

class Comment extends React.Component<ICommentProps, any> {
    rawMarkup(raw) {
        // var rawMarkup = marked(raw, { sanitize: true });
        return { __html: raw };
    }

    render() {
        return (
            <div className="comment" >
                <h2 className="commentAuthor" >
                    { this.props.author }
                    </h2>
                <span dangerouslySetInnerHTML={ this.rawMarkup(this.props.text) } />
                </div>
        );
    }
}

class CommentList extends React.Component<{ data: ICommentProps[] }, any> {
    render() {
        var nodes = this.props.data.map((comment) => <Comment author={comment.author} key={comment.key} text={comment.text} />);
        return (<div className="commentList">{nodes}</div>);
    }
}

class CommentBox extends React.Component<{ 
    comments: any[],
    onSubmit: (comment: { author: string, text: string }) => void 
}, any> {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="commentBox" >
                <h1>Comments</h1>
                <CommentList data = { this.props.comments } />
                <CommentForm onCommentSubmit = { this.props.onSubmit } />
            </div>
        );
    }
}
export default CommentBox;