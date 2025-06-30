import { TimeSignature, METRONOME_CONSTANTS } from '../types/metronome';

/**
 * 根據 BPM 計算節拍間隔（毫秒）
 */
export function calculateInterval(bpm: number): number {
  return 60000 / bpm; // 60000ms (1分鐘) / BPM
}

/**
 * 根據拍子類型獲取每小節的拍數
 */
export function getBeatsPerMeasure(timeSignature: TimeSignature): number {
  switch (timeSignature) {
    case '2/4':
      return 2;
    case '3/4':
      return 3;
    case '4/4':
      return 4;
    default:
      return 4;
  }
}

/**
 * 驗證並調整 BPM 值在有效範圍內
 */
export function validateBpm(bpm: number): number {
  if (bpm < METRONOME_CONSTANTS.MIN_BPM) return METRONOME_CONSTANTS.MIN_BPM;
  if (bpm > METRONOME_CONSTANTS.MAX_BPM) return METRONOME_CONSTANTS.MAX_BPM;
  return bpm;
}
