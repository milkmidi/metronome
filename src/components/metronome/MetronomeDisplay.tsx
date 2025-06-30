import React from 'react';
import { IMetronomeDisplayProps } from '../../types/metronome';
import { getBeatsPerMeasure } from '../../utils/metronome-utils';

function MetronomeDisplay({
  currentBeat,
  timeSignature,
  isPlaying,
}: IMetronomeDisplayProps): React.ReactElement {
  const beatsPerMeasure = getBeatsPerMeasure(timeSignature);
  const beats = Array.from({ length: beatsPerMeasure }, (_, i) => i);

  return (
    <div className="metronome-display">
      <div className="flex justify-center items-center space-x-4 py-6">
        {beats.map((beat) => (
          <div
            key={beat}
            data-testid="beat-indicator"
            className={`
              w-6 h-6 rounded-full transition-all duration-100
              ${isPlaying && beat === currentBeat
              ? 'bg-blue-500 scale-110 active'
              : 'bg-gray-300'}
              ${beat === 0 ? 'border-2 border-gray-500' : ''}
            `}
            aria-label={`Beat ${beat + 1}`}
          />
        ))}
      </div>
      <div className="text-center text-lg font-medium">
        {timeSignature}
      </div>
    </div>
  );
}

export default MetronomeDisplay;
