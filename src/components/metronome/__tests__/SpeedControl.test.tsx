import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SpeedControl from '../SpeedControl';
import { METRONOME_CONSTANTS } from '../../../types/metronome';

describe('SpeedControl', () => {
  it('應該渲染速度旋鈕控制器', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    const knob = screen.getByRole('slider');
    expect(knob).toBeInTheDocument();
    expect(knob).toHaveAttribute('aria-valuenow', '120');
  });

  it('應該顯示當前 BPM 值在旋鈕中心', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('應該顯示最小和最大 BPM 標籤', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('240')).toBeInTheDocument();
  });

  it('應該在垂直拖動向上時增加 BPM', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={120} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');

    // Simulate drag: mousedown, mousemove up, mouseup
    fireEvent.mouseDown(knob, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 50 }); // Move up 50px
    fireEvent.mouseUp(document);

    // Moving up 50px should increase BPM by ~50
    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1];
    expect(lastCall[0]).toBeGreaterThan(120);
  });

  it('應該在垂直拖動向下時減少 BPM', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={120} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');

    // Simulate drag: mousedown, mousemove down, mouseup
    fireEvent.mouseDown(knob, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 150 }); // Move down 50px
    fireEvent.mouseUp(document);

    // Moving down 50px should decrease BPM by ~50
    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1];
    expect(lastCall[0]).toBeLessThan(120);
  });

  it('應該將 BPM 限制在最小值', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={70} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');

    // Try to drag way below minimum
    fireEvent.mouseDown(knob, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 300 }); // Move down 200px
    fireEvent.mouseUp(document);

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1];
    expect(lastCall[0]).toBe(METRONOME_CONSTANTS.MIN_BPM);
  });

  it('應該將 BPM 限制在最大值', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={230} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');

    // Try to drag way above maximum
    fireEvent.mouseDown(knob, { clientY: 300 });
    fireEvent.mouseMove(document, { clientY: 100 }); // Move up 200px
    fireEvent.mouseUp(document);

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1];
    expect(lastCall[0]).toBe(METRONOME_CONSTANTS.MAX_BPM);
  });

  it('應該在不同 BPM 值時渲染正確的弧度', () => {
    const { rerender } = render(<SpeedControl bpm={60} onSpeedChange={() => {}} />);

    let knobSvg = screen.getByRole('slider');
    let arcPath = knobSvg.querySelector('path');
    expect(arcPath).toBeInTheDocument();
    const minArcPath = arcPath?.getAttribute('d');

    // Re-render with max BPM
    rerender(<SpeedControl bpm={240} onSpeedChange={() => {}} />);

    knobSvg = screen.getByRole('slider');
    arcPath = knobSvg.querySelector('path');
    const maxArcPath = arcPath?.getAttribute('d');

    // Arc paths should be different for different BPM values
    expect(minArcPath).not.toBe(maxArcPath);
  });

  it('應該在拖動時更改游標樣式', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    const knob = screen.getByRole('slider');

    // Should have grab cursor initially
    expect(knob.classList.contains('cursor-grab')).toBe(true);

    // Simulate drag start
    fireEvent.mouseDown(knob, { clientY: 100 });

    // Should have grabbing cursor while dragging
    expect(knob.classList.contains('cursor-grabbing')).toBe(true);

    // Release
    fireEvent.mouseUp(document);
  });

  it('應該設置正確的 ARIA 屬性', () => {
    render(<SpeedControl bpm={150} onSpeedChange={() => {}} />);

    const knob = screen.getByRole('slider');

    expect(knob).toHaveAttribute('aria-label', 'BPM control knob');
    expect(knob).toHaveAttribute('aria-valuemin', String(METRONOME_CONSTANTS.MIN_BPM));
    expect(knob).toHaveAttribute('aria-valuemax', String(METRONOME_CONSTANTS.MAX_BPM));
    expect(knob).toHaveAttribute('aria-valuenow', '150');
  });
});
