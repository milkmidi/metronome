import React from 'react';
import { ITimeSignatureControlProps, TimeSignature } from '../../types/metronome';

function TimeSignatureControl({
  timeSignature,
  onTimeSignatureChange,
}: ITimeSignatureControlProps): React.ReactElement {
  const timeSignatures: TimeSignature[] = ['2/4', '3/4', '4/4'];

  const handleClick = (newTimeSignature: TimeSignature): void => {
    onTimeSignatureChange(newTimeSignature);
  };

  return (
    <div className="time-signature-control">
      <div className="mb-2">
        <label className="text-lg font-medium">拍子</label>
      </div>

      <div className="flex space-x-2">
        {timeSignatures.map((ts) => (
          <button
            key={ts}
            type="button"
            onClick={() => handleClick(ts)}
            className={`
              flex-1 py-2 px-4 rounded-md font-medium text-center transition-colors
              ${timeSignature === ts
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
            aria-pressed={timeSignature === ts}
          >
            {ts}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSignatureControl;
