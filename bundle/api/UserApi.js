import Promise from 'bluebird';
import { request } from '~/utils/request';
import { normalizeError } from  '~/utils/normalizer/error';
import { normalizeUsers } from  '~/utils/normalizer/user';

export function getUsers(params) {
    return new Promise((resolve, reject) => {

        request('GET', 'users')
            .query(params)
            .end((err, res) => {
                const error = normalizeError(err, res);
                if (error) {
                    reject(error);
                }
                else {
                    resolve( normalizeUsers(res.body) );
                }
            });
    });
}
