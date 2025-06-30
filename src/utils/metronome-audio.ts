/* eslint-disable no-return-await */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { TimeSignature, IAudioEngineConfig, METRONOME_CONSTANTS } from '../types/metronome';
import { getBeatsPerMeasure } from './metronome-utils';

/**
 * 節拍器音頻引擎
 * 使用 Web Audio API 實現精確的定時控制
 */
export class MetronomeAudioEngine {
  private audioContext: AudioContext;

  private nextNoteTime: number = 0;

  private schedulerTimerId: number | null = null;

  private currentBeat: number = 0;

  private beatsPerMeasure: number = 4;

  private bpm: number = METRONOME_CONSTANTS.DEFAULT_BPM;

  private isPlaying: boolean = false;

  // 音頻緩衝區
  private strongBeatBuffer: AudioBuffer | null = null;

  private weakBeatBuffer: AudioBuffer | null = null;

  // 回調函數
  private onBeatCallback: ((beat: number) => void) | null = null;

  /**
   * 創建節拍器音頻引擎
   */
  constructor(config?: IAudioEngineConfig) {
    // 創建音頻上下文
    this.audioContext = config?.audioContext || new AudioContext();

    // 加載音效
    this.loadSounds(
      config?.strongBeatSound || '/metronome/sounds/strong-beat.mp3',
      config?.weakBeatSound || '/metronome/sounds/weak-beat.mp3',
    );
  }

  /**
   * 設置節拍回調函數
   */
  public setOnBeatCallback(callback: (beat: number) => void): void {
    this.onBeatCallback = callback;
  }

  /**
   * 設置 BPM
   */
  public setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  /**
   * 設置拍子
   */
  public setTimeSignature(timeSignature: TimeSignature): void {
    this.beatsPerMeasure = getBeatsPerMeasure(timeSignature);
    this.currentBeat = 0;
  }

  /**
   * 開始節拍器
   */
  public start(bpm?: number, timeSignature?: TimeSignature): void {
    if (this.isPlaying) return;

    if (bpm) this.setBpm(bpm);
    if (timeSignature) this.setTimeSignature(timeSignature);

    this.isPlaying = true;
    this.currentBeat = 0;

    // 確保音頻上下文已啟動
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.nextNoteTime = this.audioContext.currentTime;
    this.scheduler();
  }

  /**
   * 停止節拍器
   */
  public stop(): void {
    this.isPlaying = false;
    this.currentBeat = 0;

    if (this.schedulerTimerId !== null) {
      window.clearTimeout(this.schedulerTimerId);
      this.schedulerTimerId = null;
    }

    // 通知回調函數
    if (this.onBeatCallback) {
      this.onBeatCallback(0);
    }
  }

  /**
   * 調度器 - 負責安排音符的播放
   * 使用 setTimeout 而不是 setInterval 以避免定時器漂移
   */
  private scheduler(): void {
    // 安排未來一段時間內的音符
    while (
      this.isPlaying
      && this.nextNoteTime < this.audioContext.currentTime + METRONOME_CONSTANTS.SCHEDULER_LOOK_AHEAD
    ) {
      this.scheduleNote(this.nextNoteTime, this.currentBeat);
      this.nextNote();
    }

    // 安排下一次調度
    this.schedulerTimerId = window.setTimeout(
      () => this.scheduler(),
      METRONOME_CONSTANTS.SCHEDULER_INTERVAL,
    );
  }

  /**
   * 計算下一個音符的時間
   */
  private nextNote(): void {
    // 計算音符間隔（秒）
    const secondsPerBeat = 60.0 / this.bpm;

    // 添加到下一個音符時間
    this.nextNoteTime += secondsPerBeat;

    // 更新當前拍子位置
    this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
  }

  /**
   * 安排在特定時間播放音符
   */
  private scheduleNote(time: number, beat: number): void {
    // 播放音頻
    this.playSound(beat === 0 ? this.strongBeatBuffer : this.weakBeatBuffer, time);

    // 計算音符實際播放時間與當前時間的差值
    const noteDelta = time - this.audioContext.currentTime;

    // 安排視覺更新
    // 使用 setTimeout 而不是直接調用，以確保視覺更新與音頻同步
    window.setTimeout(() => {
      if (this.onBeatCallback) {
        this.onBeatCallback(beat);
      }
    }, noteDelta * 1000);
  }

  /**
   * 播放音效
   */
  private playSound(buffer: AudioBuffer | null, time: number): void {
    if (!buffer) return;

    // 創建音頻源
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;

    // 連接到輸出
    source.connect(this.audioContext.destination);

    // 在指定時間播放
    source.start(time);
  }

  /**
   * 加載音效
   */
  private async loadSounds(strongBeatUrl: string, weakBeatUrl: string): Promise<void> {
    try {
      // 加載強拍音效
      this.strongBeatBuffer = await this.loadSound(strongBeatUrl);

      // 加載弱拍音效
      this.weakBeatBuffer = await this.loadSound(weakBeatUrl);
    } catch (error) {
      console.error('加載音效失敗:', error);
    }
  }

  /**
   * 加載單個音效
   */
  private async loadSound(url: string): Promise<AudioBuffer> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }
}
