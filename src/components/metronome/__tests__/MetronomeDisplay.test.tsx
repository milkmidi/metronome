import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetronomeDisplay from '../MetronomeDisplay';
import { getBeatsPerMeasure } from '../../../utils/metronome-utils';

describe('MetronomeDisplay', () => {
  it('應該渲染當前拍子位置', () => {
    render(
      <MetronomeDisplay
        currentBeat={1}
        timeSignature="4/4"
        isPlaying
      />,
    );

    // 檢查是否有 4 個拍子指示器
    const beatsCount = getBeatsPerMeasure('4/4');
    const beatIndicators = screen.getAllByTestId('beat-indicator');
    expect(beatIndicators).toHaveLength(beatsCount);

    // 檢查當前拍子是否被高亮
    expect(beatIndicators[1]).toHaveClass('active');
  });

  it('應該根據拍子類型顯示正確數量的拍子指示器', () => {
    render(
      <MetronomeDisplay
        currentBeat={0}
        timeSignature="3/4"
        isPlaying
      />,
    );

    const beatIndicators = screen.getAllByTestId('beat-indicator');
    expect(beatIndicators).toHaveLength(3);
  });

  it('當節拍器停止時不應該高亮任何拍子', () => {
    render(
      <MetronomeDisplay
        currentBeat={2}
        timeSignature="4/4"
        isPlaying={false}
      />,
    );

    const beatIndicators = screen.getAllByTestId('beat-indicator');
    beatIndicators.forEach((indicator) => {
      expect(indicator).not.toHaveClass('active');
    });
  });
});
