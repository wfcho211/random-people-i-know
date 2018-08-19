import './index.scss';
import { Component } from 'react';
import { capitalize, isEmpty, map } from 'lodash';
import classNames from 'classnames';

import UserActions from '~/actions/UserActions';

// Components
import MessageText from '~/components/common/MessageText';
import Pagination from '~/components/Common/Pagination';

export default class UserList extends Component {
    static defaultProps = {
        items       : [],
        total_items : 0,
        total_pages : 0
    }

    constructor() {
        super();

        this.state = {
            user        : {},
            currentPage : 1,
            inputPage   : 1,
            errorText   : '',
            isLoading   : false,
            fading      : false
        };

        this._onKeyPress = this._onKeyPress.bind(this);
        this._onPaginationClick = this._onPaginationClick.bind(this);
        this._onPaginationChange = this._onPaginationChange.bind(this);

        this.__perpage = 3;
    }

    componentDidMount() {
        this.fetchUsers();
    }

    componentWillReceiveProps(nextProps) {
        const { storeAction, storeError } = nextProps;

        if (storeAction === UserActions.FETCH_USERS) {
            this.setState({ isLoading: true });
        }
        else if (storeAction === UserActions.SET_USERS) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { items, total_items, total_pages } = this.props;
        const { errorText, fading, currentPage, inputPage, user, isLoading } = this.state;

        return (
            <div>
                <MessageText
                    messageText={errorText || ''}
                    className={classNames({
                        'faded'         : fading,
                        'alert-danger'  : errorText && errorText.length > 0
                    })}
                />

                <div className="container mt-5 mb-5">
                    <div className="container-inner">
                        {isLoading &&
                            <div className="text-center mt-3 mb-3">
                                <i className="fas fa-spinner fa-spin" style={{ color: '#dddddd', fontSize: '50px' }}></i>
                            </div>
                        }

                        {!isLoading &&
                            <div className="row">
                                {
                                    map(items, (item, index) => {
                                        return (
                                            <div key={index} className="UserList-item col col-lg-4 col-12">
                                                <div className="UserList-item-inner">
                                                    {this.renderItem(item)}
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <Pagination
                                    page={parseInt(currentPage) || 1}
                                    total={total_items}
                                    perpage={this.__perpage}
                                    onClick={this._onPaginationClick}
                                >
                                    <div className="input-group mb-3" style={{ marginLeft: '5px' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Page</span>
                                        </div>
                                        <input type="text"
                                            style={{ maxWidth: '50px' }}
                                            className="form-control"
                                            value={inputPage}
                                            onChange={this._onPaginationChange}
                                            onKeyPress={this._onKeyPress}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">of {total_pages}</span>
                                        </div>
                                    </div>
                                </Pagination>

                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderItem(user) {
        return(
            <div className="UserList-item-details border p-3">
                <div className="UserList-item-text">
                    <label>ID:</label> {user.id}
                </div>
                <div className="UserList-item-picture">
                    <img src={user.avatar} />
                </div>
                <div className="UserList-item-text">
                    {user.first_name}, {user.last_name}
                </div>
            </div>
        )
    }

    _onKeyPress(e) {
        const { total_pages } = this.props;
        const { currentPage, inputPage } = this.state;

        if (e.key === 'Enter') {
            if (inputPage == parseInt(inputPage)) {
                if (inputPage <= total_pages) {
                    this.setState({
                        currentPage : inputPage,
                        errorText   : ''
                    }, () => this.fetchUsers());
                }
                else {
                    this.setState({
                        inputPage   : currentPage,
                        errorText   : 'Sorry, invalid page number'
                    }, () => {
                        setTimeout(() => this.setState({ fading: true }), 2500);
                        setTimeout(() => this.setState({ fading: false, errorText: '' }), 3000);
                    });
                }
            }
            else {
                this.setState({
                    inputPage   : currentPage,
                    errorText   : 'Sorry, invalid page number'
                }, () => {
                    setTimeout(() => this.setState({ fading: true }), 2500);
                    setTimeout(() => this.setState({ fading: false, errorText: '' }), 3000);
                });
            }
        }
    }

    _onPaginationClick(page, e) {
        e.preventDefault();
        this.setState({
            currentPage : page,
            errorText   : '',
            inputPage   : page
        }, () => this.fetchUsers());
    }

    _onPaginationChange(e) {
        e.preventDefault();

        const inputPage = e.target.value;
        this.setState({ inputPage, errorText: '' });
    }

    fetchUsers() {
        const { currentPage } = this.state;

        UserActions.fetchUsers({
            page    : currentPage
        });
    }
}
