# Proposal: Add Knob Controller for BPM

## Why
The current linear slider control works functionally but doesn't provide the tactile feel and precision that musicians expect from tempo controls. A rotary knob interface offers more intuitive BPM adjustment that mimics physical metronome hardware, improving user experience and control granularity for precise tempo settings.

## What Changes
- Replace the existing horizontal range slider with a circular knob controller
- Implement vertical drag interaction for BPM adjustment (drag up to increase, down to decrease)
- Display a colored arc around the knob showing the current BPM position within the 60-240 range
- Maintain the same BPM value display and min/max labels
- Keep the same props interface for the SpeedControl component to maintain compatibility

## Impact
- **Affected specs**: `speed-control` (new capability)
- **Affected code**:
  - `src/components/metronome/SpeedControl.tsx` - Major refactor to knob UI
  - `src/types/metronome.ts` - May need new types for knob configuration
- **User experience**: Changed interaction model from horizontal slider to vertical drag knob
- **Backward compatibility**: Component interface remains the same (bpm, onSpeedChange props)
