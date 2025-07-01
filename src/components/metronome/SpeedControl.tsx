import React from 'react';
import { ISpeedControlProps, METRONOME_CONSTANTS } from '../../types/metronome';
import Knob from './Knob';

function SpeedControl({ bpm, onSpeedChange }: ISpeedControlProps): React.ReactElement {
  return (
    <div className="speed-control">
      <div className="flex items-center justify-between mb-4">
        <label className="text-lg font-medium">
          速度 (BPM)
        </label>
        <span className="text-xl font-bold">{bpm}</span>
      </div>

      <div className="flex justify-center">
        <Knob
          value={bpm}
          min={METRONOME_CONSTANTS.MIN_BPM}
          max={METRONOME_CONSTANTS.MAX_BPM}
          onChange={onSpeedChange}
          size={100}
          className="mb-4"
        />
      </div>

      <div className="flex justify-between text-xs">
        <span>{METRONOME_CONSTANTS.MIN_BPM}</span>
        <span>{METRONOME_CONSTANTS.MAX_BPM}</span>
      </div>
    </div>
  );
}

export default SpeedControl;
