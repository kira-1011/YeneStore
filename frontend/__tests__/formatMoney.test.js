import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fracctional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
  });

  it('leaves off cents when its whole dollars', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(700000)).toEqual('$7,000');
  });

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(140)).toEqual('$1.40');
    expect(formatMoney(5012)).toEqual('$50.12');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(456456456456)).toEqual('$4,564,564,564.56');
  });
});
