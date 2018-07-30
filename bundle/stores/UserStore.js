import UserActions from '~/actions/UserActions';
import alt from '~/utils/alt';
import { isEmpty } from 'lodash';

class UserStore {
    constructor() {
        this.bindActions(UserActions);

        this.storeError = null;
        this.storeAction = null;

        this.items = [];
        this.total_items = 0;
        this.total_pages = 0;
    }

    /**
     * Listeners
     */
     onSetError(err) {
         this.storeAction = UserActions.SET_ERROR;
         this.storeError = err;
     }

     onFetchUsers() {
         this.storeAction = UserActions.FETCH_USERS;
     }

     onSetUsers(data) {
         this.storeAction = UserActions.SET_USERS;

         this.items = data.result || [];
         this.total_items = data.total || 0;
         this.total_pages = data.totalPages || 0;
     }
}

export default alt.createStore(UserStore, 'UserStore');
