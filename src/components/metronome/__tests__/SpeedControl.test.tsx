import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SpeedControl from '../SpeedControl';

describe('SpeedControl', () => {
  it('應該渲染速度滾動條', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('120');
  });

  it('應該顯示當前 BPM 值', () => {
    render(<SpeedControl bpm={120} onSpeedChange={() => {}} />);

    expect(screen.getByText(/120/)).toBeInTheDocument();
  });

  it('應該在滾動條變化時調用 onSpeedChange', () => {
    const handleChange = vi.fn();
    render(<SpeedControl bpm={120} onSpeedChange={handleChange} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '140' } });

    expect(handleChange).toHaveBeenCalledWith(140);
  });
});
