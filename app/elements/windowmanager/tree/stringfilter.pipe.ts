import { Pipe } from '@angular/core';

@Pipe({
	name: 'StringFilterPipe'
})
export class StringFilterPipe {

	transform(haystack: string[], needle: string) {
		needle = needle.toLowerCase();
		return haystack.filter(h => {
			return h.toLowerCase().includes(needle);
		});
	}
}
