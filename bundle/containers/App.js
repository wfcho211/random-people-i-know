import { Component } from 'react';

// Alt
import AltContainer from 'alt-container';
import UserStore from '~/stores/UserStore';

// Components
import UserList from '~/components/User/list';

export default class App extends Component {
    render() {
        return (
            <AltContainer
                stores={{
                    items           : props => ({ store: UserStore, value: UserStore.getState().items }),
                    total_items     : props => ({ store: UserStore, value: UserStore.getState().total_items }),
                    total_pages     : props => ({ store: UserStore, value: UserStore.getState().total_pages }),
                    storeAction     : props => ({ store: UserStore, value: UserStore.getState().storeAction }),
                    storeError      : props => ({ store: UserStore, value: UserStore.getState().storeError })
                }}
            >
                <UserList />
            </AltContainer>
        )
    }
}
