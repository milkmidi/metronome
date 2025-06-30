import React from 'react';
import { ISpeedControlProps, METRONOME_CONSTANTS } from '../../types/metronome';

function SpeedControl({ bpm, onSpeedChange }: ISpeedControlProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newBpm = parseInt(e.target.value, 10);
    onSpeedChange(newBpm);
  };

  return (
    <div className="speed-control">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="bpm-slider" className="text-lg font-medium">
          速度 (BPM)
        </label>
        <span className="text-xl font-bold">{bpm}</span>
      </div>

      <input
        id="bpm-slider"
        type="range"
        min={METRONOME_CONSTANTS.MIN_BPM}
        max={METRONOME_CONSTANTS.MAX_BPM}
        value={bpm}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />

      <div className="flex justify-between text-xs mt-1">
        <span>{METRONOME_CONSTANTS.MIN_BPM}</span>
        <span>{METRONOME_CONSTANTS.MAX_BPM}</span>
      </div>
    </div>
  );
}

export default SpeedControl;
