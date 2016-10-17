import { Injectable } from '@angular/core';

export class Station {
	constructor(private name: string) { }
}

export interface Halt {
	station: Station,
	time: Date
}

type Track = Halt[];
export type Railroad = Track[];

const stations: Station[] = [
	new Station("A"), new Station("B"), new Station("C")
];

const railroad: Railroad = [
	[{
		station: stations[0],
		time: new Date(0, 0, 0, 10, 0, 0)
	},
	{
		station: stations[0],
		time: new Date(0, 0, 0, 10, 10, 0)
	},
	{
		station: stations[1],
		time: new Date(0, 0, 0, 11, 0, 0)
	},
	{
		station: stations[1],
		time: new Date(0, 0, 0, 11, 5, 0)
	},
	{
		station: stations[2],
		time: new Date(0, 0, 0, 11, 30, 0)
	}]
];

@Injectable()
export class RailroadService {
	constructor() { }

	getRailroad(): Railroad {
		return railroad;
	}

	getAllStations(): Station[] {
		return stations;
	}
}
