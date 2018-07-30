import alt from '~/utils/alt';
import * as UserApi from '~/api/UserApi';

class UserActions {
    setError(err) {
        return err;
    }

    fetchUsers(params) {
        return dispatch => {
            dispatch();

            return UserApi.getUsers(params)
                .then(this.setUsers)
                .catch(this.setError);
        }
    }

    setUsers(data) {
        return data;
    }
}

export default alt.createActions(UserActions);
