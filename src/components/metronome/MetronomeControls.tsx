import React from 'react';
import { IMetronomeControlsProps } from '../../types/metronome';

function MetronomeControls({
  isPlaying,
  onPlayToggle,
}: IMetronomeControlsProps): React.ReactElement {
  return (
    <div className="metronome-controls flex justify-center mt-6">
      <button
        type="button"
        onClick={onPlayToggle}
        className={`
          py-3 px-8 rounded-full font-medium text-white transition-colors
          ${isPlaying
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'}
        `}
        aria-label={isPlaying ? '停止節拍器' : '開始節拍器'}
      >
        {isPlaying ? '停止' : '開始'}
      </button>
    </div>
  );
}

export default MetronomeControls;
