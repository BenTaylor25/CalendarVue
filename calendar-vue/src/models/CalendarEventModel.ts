
export class CalendarEventModel {
    private _name: string;
    private _startTime: Date;
    private _endTime: Date;
    //private _durationMinutes: number;

    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get startTime(): Date {
        return this._startTime;
    }
    set startTime(startTime: Date) {
        this._startTime = startTime;
    }

    get endTime(): Date {
        return this._endTime;
    }
    set endTime(endTime: Date) {
        this._endTime = endTime;
    }

    // TODO: durationMinutes.

    constructor(name: string, startTime: Date, endTime: Date) {
        this._name = name;
        this._startTime = startTime;
        this._endTime = endTime;
    }
}
