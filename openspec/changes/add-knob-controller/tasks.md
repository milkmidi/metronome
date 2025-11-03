# Implementation Tasks

## 1. Preparation
- [x] 1.1 Review current SpeedControl component implementation
- [x] 1.2 Research React SVG circular progress/arc rendering patterns
- [x] 1.3 Plan SVG structure for knob and arc display

## 2. Create Knob Component Base
- [x] 2.1 Create SVG circle and arc elements in SpeedControl
- [x] 2.2 Calculate arc path based on BPM value (map 60-240 to 0-270 degrees)
- [x] 2.3 Add center circle for the knob body
- [x] 2.4 Position BPM numeric display in the center of the knob
- [x] 2.5 Add min/max labels (60 and 240) below or around the knob

## 3. Implement Drag Interaction
- [x] 3.1 Add onMouseDown handler to capture initial drag position
- [x] 3.2 Add onMouseMove handler (document-level) to track vertical drag delta
- [x] 3.3 Calculate BPM change based on vertical pixel movement (1px ≈ 1 BPM)
- [x] 3.4 Clamp BPM values to MIN_BPM and MAX_BPM boundaries
- [x] 3.5 Add onMouseUp handler (document-level) to end drag interaction
- [x] 3.6 Clean up event listeners on component unmount

## 4. Add Visual Feedback
- [x] 4.1 Implement hover state with cursor change (cursor-grab/cursor-grabbing)
- [x] 4.2 Add active drag state styling (enhanced shadow and scale)
- [x] 4.3 Ensure arc color uses Tailwind palette (blue-500)
- [x] 4.4 Style inactive arc portion with muted gray (gray-200)
- [x] 4.5 Add smooth transition for arc updates when not actively dragging

## 5. Testing
- [x] 5.1 Update SpeedControl.test.tsx to test knob rendering
- [x] 5.2 Add test for arc calculation at various BPM values (60, 120, 180, 240)
- [x] 5.3 Add test for vertical drag increasing BPM
- [x] 5.4 Add test for vertical drag decreasing BPM
- [x] 5.5 Add test for boundary clamping (cannot go below 60 or above 240)
- [x] 5.6 Add test for onSpeedChange callback invocation during drag
- [x] 5.7 Test cursor state changes (grab/grabbing)

## 6. Integration and Polish
- [x] 6.1 Verify knob works correctly in Metronome parent component
- [x] 6.2 Update Metronome integration test for knob interaction
- [x] 6.3 Ensure accessibility (added aria-label, role, and aria-value attributes)
- [x] 6.4 Run full test suite with `npm test` - all 35 tests passing
- [x] 6.5 Run linter with `npm run lint` - no new issues
- [x] 6.6 Verified drag sensitivity (1px = 1 BPM) for precise control

## 7. Documentation
- [x] 7.1 Add inline comments explaining arc angle calculation
- [x] 7.2 Document drag sensitivity in inline comments (1px ≈ 1 BPM)
- [x] 7.3 Component has clear comments for all major sections
