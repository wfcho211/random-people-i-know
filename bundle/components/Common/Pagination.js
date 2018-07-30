import './Pagination.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { times, isEmpty, cloneDeep, assign } from 'lodash';

export default class Pagination extends Component {
    static propTypes = {
        perpage         : PropTypes.number.isRequired,  // items per page
        page            : PropTypes.number.isRequired,  // current page
        total           : PropTypes.number.isRequired,  // total result
        onClick         : PropTypes.func,               // navigation clicked, func(page, e)
        enableScrollTop : PropTypes.bool,           // enable scrolling to top after onClick event, default true
    };

    static defaultProps = {
        onClick         : () => {},
        enableScrollTop : true
    }

    render() {
        const { className } = this.props;


        return (
            <nav className={classNames("Pagination", className)}>
                <ul className="list-inline">
                    {this.renderPrev()}
                    {this.renderPages()}
                    {this.renderNext()}
                    {this.renderChildren()}
                </ul>
            </nav>
        )
    }

    renderPages() {
        const meta = this.getPagiMeta();

        const childs = [],
              before_count = meta.page - 1,
              after_count = meta.total_page - meta.page;

        // In middle case
        if (before_count > 3 && after_count > 3) {
            childs.push(1);
            childs.push('');
            childs.push(meta.page - 1);
            childs.push(meta.page);
            childs.push(meta.page + 1);
            childs.push('');
            childs.push(meta.total_page);
        }
        // Full list case
        else if (meta.total_page < 8) {
            times(meta.total_page, n => {
                childs.push(n + 1);
            });
        }
        // First list case
        else if (before_count < 4) {
            for (let n = 1; n < 6; n++) {
                childs.push(n);
            }
            childs.push('');
            childs.push(meta.total_page);
        }
        // Last list case
        else if (after_count < 4) {
            childs.push(1);
            childs.push('');
            for (let n = meta.total_page - 4; n <= meta.total_page; n++) {
                childs.push(n);
            }
        }

        return childs.map((val, index) =>
            this.renderItem(
                `page_${index}`,
                val,
                val,
                { __active: val === meta.page, __other: !val, __disabled: !val }
            )
        )
    }

    renderPrev() {
        const meta = this.getPagiMeta();

        return this.renderItem(
            'prev',
            meta.page - 1,
            (<i className="fas fa-caret-left"></i>),
            { __disabled: meta.page <= 1 }
        )
    }

    renderNext() {
        const meta = this.getPagiMeta();

        return this.renderItem(
            'next',
            meta.page + 1,
            (<i className="fas fa-caret-right"></i>),
            { __disabled: meta.page >= meta.total_page }
        )
    }

    renderChildren() {
        return(
            <li>
                {this.props.children}
            </li>
        )
    }

    renderItem(key, page, text, className) {
        const { onClick } = this.props;

        return (
            <li key={key}>
                <a className={classNames("Pagination-item", className)}
                    href="#"
                    onClick={this._onClick.bind(this, page)}
                >
                    {text || '...'}
                </a>
            </li>
        )
    }

    // internal
    getPagiMeta() {
        const { perpage, page, total } = this.props;
        const total_page = Math.ceil( total / perpage );

        return {
            perpage,
            page,
            total,
            total_page,
        }
    }

    _onClick(page, e) {
        const { enableScrollTop } = this.props;

        if (enableScrollTop) {
            // Auto scroll to top
            window.scrollTo(0, 0);
        }

        if (this.props.onClick) {
            this.props.onClick(page, e);
        }
    }
}
