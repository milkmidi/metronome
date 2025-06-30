/* eslint-disable camelcase */
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeSignatureControl from '../TimeSignatureControl';

describe('TimeSignatureControl', () => {
  it('應該渲染三個拍子按鈕', () => {
    render(
      <TimeSignatureControl
        timeSignature="4/4"
        onTimeSignatureChange={() => {}}
      />,
    );

    expect(screen.getByText('2/4')).toBeInTheDocument();
    expect(screen.getByText('3/4')).toBeInTheDocument();
    expect(screen.getByText('4/4')).toBeInTheDocument();
  });

  it('應該高亮顯示當前選中的拍子', () => {
    render(
      <TimeSignatureControl
        timeSignature="3/4"
        onTimeSignatureChange={() => {}}
      />,
    );

    const button3_4 = screen.getByText('3/4');
    expect(button3_4.className).toContain('bg-blue-500'); // 假設選中時使用藍色背景
  });

  it('應該在點擊按鈕時調用 onTimeSignatureChange', () => {
    const handleChange = vi.fn();
    render(
      <TimeSignatureControl
        timeSignature="4/4"
        onTimeSignatureChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByText('2/4'));

    expect(handleChange).toHaveBeenCalledWith('2/4');
  });
});
