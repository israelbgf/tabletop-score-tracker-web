import {formatPosition} from "./Util";

it('formats positions', () => {
    expect(formatPosition(0)).toEqual(undefined)
    expect(formatPosition(1)).toEqual("1st")
    expect(formatPosition(2)).toEqual("2nd")
    expect(formatPosition(3)).toEqual("3rd")
    expect(formatPosition(4)).toEqual("4th")
    expect(formatPosition(5)).toEqual("5th")
});

