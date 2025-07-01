import React, { useState, useCallback, useRef } from 'react';

interface KnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  size?: number;
  className?: string;
}

function Knob({ value, min, max, onChange, size = 80, className = '' }: KnobProps): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseY = useRef(0);
  const sensitivity = 2; // Higher value = more sensitive
  
  // Convert value to rotation angle (0 to 270 degrees)
  const valueToAngle = useCallback((val: number): number => {
    const normalizedValue = (val - min) / (max - min);
    return normalizedValue * 270; // 270 degrees max rotation
  }, [min, max]);

  // Convert rotation angle to value
  const angleToValue = useCallback((angle: number): number => {
    const normalizedAngle = Math.max(0, Math.min(270, angle)) / 270;
    return Math.round(min + normalizedAngle * (max - min));
  }, [min, max]);

  const currentAngle = valueToAngle(value);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseY.current = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = lastMouseY.current - e.clientY; // Inverted: up = positive
    lastMouseY.current = e.clientY;

    const currentAngle = valueToAngle(value);
    const newAngle = currentAngle + (deltaY * sensitivity);
    const newValue = angleToValue(newAngle);

    if (newValue !== value) {
      onChange(newValue);
    }
  }, [isDragging, value, valueToAngle, angleToValue, onChange, sensitivity]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          relative rounded-full border-4 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200
          shadow-lg cursor-grab active:cursor-grabbing transition-shadow duration-150
          ${isDragging ? 'shadow-xl' : 'hover:shadow-lg'}
        `}
        style={{
          width: size,
          height: size,
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Knob indicator */}
        <div
          className="absolute w-1 bg-gray-600 rounded-full transition-transform duration-75"
          style={{
            height: size * 0.3,
            left: '50%',
            top: size * 0.1,
            transformOrigin: `50% ${size * 0.4}px`,
            transform: `translateX(-50%) rotate(${currentAngle - 135}deg)`,
          }}
        />
        
        {/* Center dot */}
        <div
          className="absolute bg-gray-600 rounded-full"
          style={{
            width: size * 0.1,
            height: size * 0.1,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      
      {/* Value display */}
      <div className="text-center mt-2 text-sm font-medium text-gray-700">
        {value}
      </div>
    </div>
  );
}

export default Knob;