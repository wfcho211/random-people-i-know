import { has } from 'lodash';

export function normalizeError(err, res) {
    if (err) {
		err.code = 500;
		return err;
	}
	else if (has(res.body, 'error')) {
		const err = new Error(res.body.error);
        err.code = 200;
        return err;
    }

    return false;
}
