import { describe, it, expect } from 'vitest';
import {
  calculateInterval,
  getBeatsPerMeasure,
  validateBpm,
} from '../metronome-utils';

describe('calculateInterval', () => {
  it('應該正確計算 60 BPM 的間隔', () => {
    expect(calculateInterval(60)).toBe(1000); // 60 BPM = 1000ms
  });

  it('應該正確計算 120 BPM 的間隔', () => {
    expect(calculateInterval(120)).toBe(500); // 120 BPM = 500ms
  });

  it('應該正確計算 240 BPM 的間隔', () => {
    expect(calculateInterval(240)).toBe(250); // 240 BPM = 250ms
  });
});

describe('getBeatsPerMeasure', () => {
  it('應該返回 2/4 拍子的每小節拍數', () => {
    expect(getBeatsPerMeasure('2/4')).toBe(2);
  });

  it('應該返回 3/4 拍子的每小節拍數', () => {
    expect(getBeatsPerMeasure('3/4')).toBe(3);
  });

  it('應該返回 4/4 拍子的每小節拍數', () => {
    expect(getBeatsPerMeasure('4/4')).toBe(4);
  });
});

describe('validateBpm', () => {
  it('應該接受有效範圍內的 BPM', () => {
    expect(validateBpm(60)).toBe(60);
    expect(validateBpm(120)).toBe(120);
    expect(validateBpm(240)).toBe(240);
  });

  it('應該將低於最小值的 BPM 調整為最小值', () => {
    expect(validateBpm(30)).toBe(60); // 最小值為 60
  });

  it('應該將高於最大值的 BPM 調整為最大值', () => {
    expect(validateBpm(300)).toBe(240); // 最大值為 240
  });
});
