/* eslint-disable max-len */
import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { MetronomeAudioEngine } from '../metronome-audio';

// 模擬 Web Audio API
class MockAudioContext {
  currentTime = 0;

  state = 'running';

  destination = {};

  resume = vi.fn();

  createBufferSource = vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
  });

  decodeAudioData = vi.fn().mockResolvedValue({});
}

describe('MetronomeAudioEngine', () => {
  let audioEngine: MetronomeAudioEngine;
  let mockAudioContext: MockAudioContext;

  beforeEach(() => {
    vi.useFakeTimers();
    mockAudioContext = new MockAudioContext();
    audioEngine = new MetronomeAudioEngine({ audioContext: mockAudioContext as unknown as AudioContext });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('應該創建音頻引擎', () => {
    expect(audioEngine).toBeDefined();
  });

  it('應該在調用 start 時開始節拍器', () => {
    const onBeatCallback = vi.fn();
    audioEngine.setOnBeatCallback(onBeatCallback);

    audioEngine.start(120, '4/4');

    // 前進時間以觸發調度器
    vi.advanceTimersByTime(100);

    // 檢查是否調用了回調函數
    expect(onBeatCallback).toHaveBeenCalled();
  });

  it('應該在調用 stop 時停止節拍器', () => {
    const onBeatCallback = vi.fn();
    audioEngine.setOnBeatCallback(onBeatCallback);

    audioEngine.start(120, '4/4');
    vi.advanceTimersByTime(100);

    // 重置模擬函數
    onBeatCallback.mockReset();

    audioEngine.stop();
    vi.advanceTimersByTime(100);

    // 檢查是否調用了回調函數，並傳入 0
    expect(onBeatCallback).toHaveBeenCalledWith(0);

    // 再次前進時間，確保不再調用回調函數
    onBeatCallback.mockReset();
    vi.advanceTimersByTime(1000);
    expect(onBeatCallback).not.toHaveBeenCalled();
  });
});
