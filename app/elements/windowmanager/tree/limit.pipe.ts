import { Pipe } from '@angular/core';

@Pipe({
	name: 'LimitPipe'
})
export class LimitPipe {

	transform(haystack: string[], limit: number) {
		if (!limit || limit < 0) {
			limit = 0;
		}

		return haystack.splice(0, limit);
	}
}
