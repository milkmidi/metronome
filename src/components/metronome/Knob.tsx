import React, { useState, useCallback, useRef } from 'react';

// Constants for better maintainability
const DEFAULT_SENSITIVITY = 2; // Higher value = more sensitive
const MAX_ROTATION_DEGREES = 270; // Maximum knob rotation
const ROTATION_OFFSET = 135; // Offset to center the starting position

interface KnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  size?: number;
  className?: string;
  sensitivity?: number;
  label?: string;
}

function Knob({ 
  value, 
  min, 
  max, 
  onChange, 
  size = 80, 
  className = '', 
  sensitivity = DEFAULT_SENSITIVITY,
  label = 'Knob control'
}: KnobProps): React.ReactElement {
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseY = useRef(0);
  const currentAngleRef = useRef(0); // Cache current angle for performance
  
  // Convert value to rotation angle (0 to MAX_ROTATION_DEGREES)
  const valueToAngle = useCallback((val: number): number => {
    const normalizedValue = (val - min) / (max - min);
    return normalizedValue * MAX_ROTATION_DEGREES;
  }, [min, max]);

  // Convert rotation angle to value
  const angleToValue = useCallback((angle: number): number => {
    const normalizedAngle = Math.max(0, Math.min(MAX_ROTATION_DEGREES, angle)) / MAX_ROTATION_DEGREES;
    return Math.round(min + normalizedAngle * (max - min));
  }, [min, max]);

  // Update cached angle when value changes
  const currentAngle = valueToAngle(value);
  currentAngleRef.current = currentAngle;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseY.current = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = lastMouseY.current - e.clientY; // Inverted: up = positive
    lastMouseY.current = e.clientY;

    // Use cached angle for better performance
    const newAngle = currentAngleRef.current + (deltaY * sensitivity);
    const newValue = angleToValue(newAngle);

    if (newValue !== value) {
      currentAngleRef.current = valueToAngle(newValue); // Update cache
      onChange(newValue);
    }
  }, [isDragging, value, angleToValue, onChange, sensitivity]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle keyboard interactions for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newValue = value;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        newValue = Math.min(max, value + 1);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue = Math.max(min, value - 1);
        break;
      case 'PageUp':
        newValue = Math.min(max, value + 10);
        break;
      case 'PageDown':
        newValue = Math.max(min, value - 10);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return; // Don't preventDefault for other keys
    }
    
    if (newValue !== value) {
      e.preventDefault();
      onChange(newValue);
    }
  }, [value, min, max, onChange]);

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
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        tabIndex={0}
        className={`
          relative rounded-full border-4 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200
          shadow-lg cursor-grab active:cursor-grabbing transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isDragging ? 'shadow-xl' : 'hover:shadow-lg'}
        `}
        style={{
          width: size,
          height: size,
        }}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        {/* Knob indicator */}
        <div
          className="absolute w-1 bg-gray-600 rounded-full transition-transform duration-75"
          style={{
            height: size * 0.3,
            left: '50%',
            top: size * 0.1,
            transformOrigin: `50% ${size * 0.4}px`,
            transform: `translateX(-50%) rotate(${currentAngle - ROTATION_OFFSET}deg)`,
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