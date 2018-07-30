import './MessageText.scss';
import classNames from 'classnames';

import { Component } from 'react';

export default class MessageText extends Component {
    static defaultProps = {
        className   : '',
        styles      : {}
    }

    render() {
        const { className, styles, messageText } = this.props;

        if (!messageText || messageText.length === 0) {
            return null;
        }

        return (
            <div className={classNames('MessageText', className)} style={styles}>
                {messageText}
            </div>
        )
    }
}
