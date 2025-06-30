import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MetronomeControls from '../MetronomeControls';

describe('MetronomeControls', () => {
  it('應該渲染開始按鈕當節拍器未播放時', () => {
    render(<MetronomeControls isPlaying={false} onPlayToggle={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('開始');
  });

  it('應該渲染停止按鈕當節拍器正在播放時', () => {
    render(<MetronomeControls isPlaying onPlayToggle={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('停止');
  });

  it('應該在點擊按鈕時調用 onPlayToggle', () => {
    const handlePlayToggle = vi.fn();
    render(<MetronomeControls isPlaying={false} onPlayToggle={handlePlayToggle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handlePlayToggle).toHaveBeenCalled();
  });
});
