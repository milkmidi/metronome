/* eslint-disable camelcase */
import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Metronome from '../Metronome';

// 模擬 Web Audio API
vi.mock('../../utils/metronome-audio', () => ({
  MetronomeAudioEngine: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    setTimeSignature: vi.fn(),
    setBpm: vi.fn(),
    setOnBeatCallback: vi.fn(),
  })),
}));

describe('Metronome', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('應該渲染所有節拍器組件', () => {
    render(<Metronome />);

    // 檢查是否渲染了所有必要的組件
    expect(screen.getByRole('slider')).toBeInTheDocument(); // SpeedControl
    expect(screen.getByText('2/4')).toBeInTheDocument(); // TimeSignatureControl
    expect(screen.getByText('開始')).toBeInTheDocument(); // MetronomeControls
  });

  it('應該在點擊開始按鈕時開始節拍器', () => {
    render(<Metronome />);

    const startButton = screen.getByText('開始');
    fireEvent.click(startButton);

    // 檢查按鈕文字是否變為「停止」
    expect(screen.getByText('停止')).toBeInTheDocument();
  });

  it('應該在調整速度旋鈕時更新 BPM', () => {
    render(<Metronome />);

    const knob = screen.getByRole('slider');

    // Simulate dragging the knob upward to increase BPM
    // Default is 120, dragging up 20px should increase to 140
    fireEvent.mouseDown(knob, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 80 }); // Move up 20px
    fireEvent.mouseUp(document);

    // 檢查 BPM 顯示是否更新
    expect(screen.getByText('140')).toBeInTheDocument();
  });

  it('應該在點擊拍子按鈕時更改拍子', () => {
    render(<Metronome />);

    // 假設默認拍子是 4/4
    const button3_4 = screen.getByText('3/4');
    fireEvent.click(button3_4);

    // 檢查 3/4 按鈕是否被選中
    expect(button3_4.className).toContain('bg-blue-500');
  });
});
