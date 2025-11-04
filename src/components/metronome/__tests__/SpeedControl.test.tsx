import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SpeedControl from '../SpeedControl';

describe('SpeedControl', () => {
  it('應該渲染速度控制元件', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    // Check for the knob component (it has role="slider" when we add accessibility)
    const knob = screen.getByRole('slider');
    expect(knob).toBeInTheDocument();
    expect(knob).toHaveAttribute('aria-valuenow', '120');
  });

  it('應該顯示當前 BPM 值', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    // The value should appear in multiple places - the header and the knob display
    const bpmValues = screen.getAllByText('120');
    expect(bpmValues.length).toBeGreaterThan(0);
  });

  it('應該在鍵盤互動時調用 onSpeedChange', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={120} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');
    
    // Test keyboard interaction - arrow up should increase value
    fireEvent.keyDown(knob, { key: 'ArrowUp' });
    expect(handleChange).toHaveBeenCalledWith(121);
    
    // Test arrow down should decrease value
    fireEvent.keyDown(knob, { key: 'ArrowDown' });
    expect(handleChange).toHaveBeenCalledWith(119);
  });

  it('應該支援鼠標拖拽互動', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={120} onSpeedChange={handleChange} />);

    const knob = screen.getByRole('slider');
    
    // Simulate mouse drag (mousedown -> mousemove -> mouseup)
    fireEvent.mouseDown(knob, { clientY: 100 });
    fireEvent.mouseMove(document, { clientY: 90 }); // Move up 10px
    fireEvent.mouseUp(document);
    
    // Should have called onChange due to drag movement
    expect(handleChange).toHaveBeenCalled();
  });
});
