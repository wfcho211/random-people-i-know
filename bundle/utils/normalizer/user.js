import { map } from 'lodash';

export function normalizeUsers(result) {
    return {
		result        : map(result.data, normalizeUser),
        total         : result.total,
		currentPage   : result.page,
        totalPages    : result.total_pages,
	}
}

export function normalizeUser(data)  {
    return {
        id              : data.id,
        first_name      : data.first_name,
        last_name       : data.last_name,
        avatar          : data.avatar
    };
}
