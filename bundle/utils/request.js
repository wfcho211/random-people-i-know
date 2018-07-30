import superagent from 'superagent';

/**
 * Request internal API
 *
 * @params
 * - {string} method 	: Request method
 * - {string} endpoint 	: Request URL
 */
export function request(method = 'GET', endpoint) {
    const ajax = superagent(method, `${process.env.API_URL}${endpoint}`);
    return ajax;
}
