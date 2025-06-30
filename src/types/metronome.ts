/**
 * 拍子類型
 */
export type TimeSignature = '2/4' | '3/4' | '4/4';

/**
 * 節拍器狀態介面
 */
export interface IMetronomeState {
  /** 是否正在播放 */
  isPlaying: boolean;

  /** 每分鐘拍數 (60-240) */
  bpm: number;

  /** 拍子 (2/4, 3/4, 4/4) */
  timeSignature: TimeSignature;

  /** 當前拍子位置 */
  currentBeat: number;
}

/**
 * 速度控制組件屬性
 */
export interface ISpeedControlProps {
  /** 當前 BPM */
  bpm: number;

  /** BPM 變化回調函數 */
  onSpeedChange: (bpm: number) => void;
}

/**
 * 拍子控制組件屬性
 */
export interface ITimeSignatureControlProps {
  /** 當前拍子 */
  timeSignature: TimeSignature;

  /** 拍子變化回調函數 */
  onTimeSignatureChange: (timeSignature: TimeSignature) => void;
}

/**
 * 節拍器顯示組件屬性
 */
export interface IMetronomeDisplayProps {
  /** 當前拍子位置 */
  currentBeat: number;

  /** 當前拍子 */
  timeSignature: TimeSignature;

  /** 是否正在播放 */
  isPlaying: boolean;
}

/**
 * 節拍器控制組件屬性
 */
export interface IMetronomeControlsProps {
  /** 是否正在播放 */
  isPlaying: boolean;

  /** 播放/停止切換回調函數 */
  onPlayToggle: () => void;
}

/**
 * 節拍器音頻引擎配置
 */
export interface IAudioEngineConfig {
  /** 音頻上下文 */
  audioContext?: AudioContext;

  /** 強拍音效 URL */
  strongBeatSound?: string;

  /** 弱拍音效 URL */
  weakBeatSound?: string;
}

/**
 * 節拍器常量
 */
export const METRONOME_CONSTANTS = {
  MIN_BPM: 60,
  MAX_BPM: 240,
  DEFAULT_BPM: 120,
  DEFAULT_TIME_SIGNATURE: '4/4' as TimeSignature,
  SCHEDULER_LOOK_AHEAD: 0.1, // 秒
  SCHEDULER_INTERVAL: 25, // 毫秒
};
