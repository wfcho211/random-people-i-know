import './index.scss';

import { Component } from 'react';
import { capitalize } from 'lodash';
import moment from 'moment';

export default class UserProfile extends Component {
    render() {
        const { user } = this.props;

        console.log(user)

        return(
            <div className="UserProfile">
                <div className="UserProfile-inner row">
                    <div className="UserList-item-picture col col-md-4 col-12">
                        <img src={user.picture.large} />
                    </div>
                    <div className="UserList-item-details col col-md-8 col-12">
                        <div className="UserList-item-name">
                            {`${capitalize(user.name.title)} ${capitalize(user.name.first)} ${capitalize(user.name.last)}`} ({user.dob.age})
                            <i className={`fas fa-${user.gender || 'genderless'}`}></i>
                        </div>
                        <div className="UserList-item-cell">
                            <label>Nationality</label>
                            {user.nat}
                        </div>
                        <div className="UserList-item-cell">
                            <label>Mobile</label>
                            {user.cell}
                        </div>
                        <div className="UserList-item-phone">
                            <label>Phone</label>
                            {user.phone}
                        </div>
                        <div className="UserList-item-email">
                            <label>Email</label>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                        <div className="UserList-item-phone">
                            <label>D.O.B</label>
                            {moment(user.dob.date).isValid() ? moment(user.dob.date).format('DD MMM, YYYY') : '-'}
                        </div>
                        <div className="UserList-item-location">
                            <label className="block">Location</label>
                            {user.location.street}, {user.location.city}<br />
                            {user.location.state}, {user.location.postcode}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
