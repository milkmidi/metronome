import React, { useState, useEffect, useRef } from 'react';
import { ISpeedControlProps, METRONOME_CONSTANTS } from '../../types/metronome';

function SpeedControl({ bpm, onSpeedChange }: ISpeedControlProps): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number>(0);
  const dragStartBpm = useRef<number>(0);

  // Calculate arc path for the progress indicator
  // Maps BPM (60-240) to arc angle (0-270 degrees), starting from bottom-left
  const calculateArcPath = (currentBpm: number): string => {
    const { MIN_BPM, MAX_BPM } = METRONOME_CONSTANTS;
    const percentage = (currentBpm - MIN_BPM) / (MAX_BPM - MIN_BPM);
    // Use 270 degrees max (3/4 circle) for better visual balance
    const angle = percentage * 270;

    const centerX = 80;
    const centerY = 80;
    const radius = 60;

    // Start angle at 135 degrees (bottom-left)
    const startAngle = 135;
    const endAngle = startAngle + angle;

    // Convert to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Handle mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartBpm.current = bpm;
  };

  // Handle mouse move during drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;

      const deltaY = dragStartY.current - e.clientY; // Inverted: up = positive
      // 1 pixel ≈ 1 BPM for precise control
      const bpmChange = deltaY;
      const newBpm = dragStartBpm.current + bpmChange;

      // Clamp to valid range
      const clampedBpm = Math.max(
        METRONOME_CONSTANTS.MIN_BPM,
        Math.min(METRONOME_CONSTANTS.MAX_BPM, Math.round(newBpm)),
      );

      if (clampedBpm !== bpm) {
        onSpeedChange(clampedBpm);
      }
    };

    const handleMouseUp = (): void => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, bpm, onSpeedChange]);

  const arcPath = calculateArcPath(bpm);

  return (
    <div className="speed-control">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="bpm-knob" className="text-lg font-medium">
          速度 (BPM)
        </label>
      </div>

      <div className="flex flex-col items-center">
        {/* SVG Knob */}
        <svg
          id="bpm-knob"
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-transform ${isDragging ? 'scale-105' : 'hover:scale-102'}`}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-label="BPM control knob"
          aria-valuemin={METRONOME_CONSTANTS.MIN_BPM}
          aria-valuemax={METRONOME_CONSTANTS.MAX_BPM}
          aria-valuenow={bpm}
        >
          {/* Background circle (inactive track) */}
          <circle
            cx="80"
            cy="80"
            r="60"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Active arc (progress indicator) */}
          <path
            d={arcPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            className={isDragging ? '' : 'transition-all duration-200'}
          />

          {/* Center knob body */}
          <circle
            cx="80"
            cy="80"
            r="45"
            fill="#ffffff"
            stroke="#d1d5db"
            strokeWidth="2"
            className={isDragging ? 'drop-shadow-lg' : 'drop-shadow-md'}
          />

          {/* BPM value display in center */}
          <text
            x="80"
            y="85"
            textAnchor="middle"
            className="fill-gray-800 text-2xl font-bold select-none"
            style={{ fontSize: '24px', fontFamily: 'system-ui, sans-serif' }}
          >
            {bpm}
          </text>
        </svg>

        {/* Min/Max labels */}
        <div className="flex justify-between w-40 text-xs mt-2">
          <span className="text-gray-600">{METRONOME_CONSTANTS.MIN_BPM}</span>
          <span className="text-gray-600">{METRONOME_CONSTANTS.MAX_BPM}</span>
        </div>
      </div>
    </div>
  );
}

export default SpeedControl;
