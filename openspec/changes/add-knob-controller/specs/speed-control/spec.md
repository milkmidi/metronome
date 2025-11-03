# Speed Control Capability

## ADDED Requirements

### Requirement: Rotary Knob Display
The speed control component SHALL render a circular knob with a visual arc indicator showing the current BPM position within the valid range.

#### Scenario: Knob renders with correct arc position
- **WHEN** the component is mounted with bpm=120
- **THEN** the knob displays a circular control element
- **AND** a colored arc spans from the start position to the position representing 120 BPM on the 60-240 scale
- **AND** the arc angle is calculated proportionally (120 is at 33% of range, so arc covers 33% of the circle)

#### Scenario: Arc updates when BPM changes
- **WHEN** the BPM value changes from 120 to 180
- **THEN** the colored arc animates smoothly to the new position representing 180 BPM
- **AND** the arc now covers 66% of the circular path

### Requirement: Vertical Drag Interaction
The knob control SHALL allow users to adjust BPM by dragging vertically on the knob element.

#### Scenario: Drag upward increases BPM
- **WHEN** user clicks and holds on the knob
- **AND** drags the mouse upward by 50 pixels
- **THEN** the BPM value increases proportionally to the drag distance
- **AND** the knob arc rotates to reflect the new value
- **AND** the onSpeedChange callback is invoked with the new BPM value

#### Scenario: Drag downward decreases BPM
- **WHEN** user clicks and holds on the knob
- **AND** drags the mouse downward by 50 pixels
- **THEN** the BPM value decreases proportionally to the drag distance
- **AND** the knob arc rotates to reflect the new value
- **AND** the onSpeedChange callback is invoked with the new BPM value

#### Scenario: Drag respects min/max boundaries
- **WHEN** user drags beyond the maximum range
- **THEN** the BPM stops at METRONOME_CONSTANTS.MAX_BPM (240)
- **AND** further upward dragging does not increase the value
- **WHEN** user drags below the minimum range
- **THEN** the BPM stops at METRONOME_CONSTANTS.MIN_BPM (60)
- **AND** further downward dragging does not decrease the value

### Requirement: BPM Value Display
The knob control SHALL display the current BPM value as a numeric label prominently near the knob.

#### Scenario: BPM label updates in real-time
- **WHEN** the user drags the knob and BPM changes from 120 to 125
- **THEN** the numeric BPM display updates to show "125"
- **AND** the update occurs during the drag operation, not just on release

#### Scenario: Label shows initial BPM value
- **WHEN** the component first renders with bpm=100
- **THEN** the BPM label displays "100"

### Requirement: Range Indicators
The knob control SHALL display the minimum and maximum BPM values to provide context for the valid range.

#### Scenario: Min and max labels are visible
- **WHEN** the knob component is rendered
- **THEN** a label showing METRONOME_CONSTANTS.MIN_BPM (60) is visible
- **AND** a label showing METRONOME_CONSTANTS.MAX_BPM (240) is visible
- **AND** labels are positioned to indicate the start and end of the knob's range

### Requirement: Drag Sensitivity
The knob control SHALL provide appropriate drag sensitivity for precise BPM adjustment within the 60-240 range.

#### Scenario: Reasonable drag-to-BPM ratio
- **WHEN** user drags vertically by 180 pixels (full expected drag range)
- **THEN** the BPM changes by the full range (180 BPM difference)
- **AND** a 1-pixel drag results in approximately 1 BPM change
- **AND** users can easily make fine adjustments of 1-2 BPM

### Requirement: Visual Feedback During Interaction
The knob control SHALL provide clear visual feedback when the user is actively dragging.

#### Scenario: Hover state shows interactivity
- **WHEN** user hovers over the knob
- **THEN** the cursor changes to indicate draggability
- **AND** the knob element may show a subtle highlight or scale effect

#### Scenario: Active drag state is visible
- **WHEN** user is actively dragging the knob
- **THEN** the knob shows a distinct active state (e.g., enhanced shadow, different color)
- **AND** the state persists until the user releases the mouse button

### Requirement: Flat Arc Design
The knob SHALL use a flat design aesthetic with a colored arc, matching the existing Tailwind CSS design system.

#### Scenario: Arc uses appropriate colors
- **WHEN** the knob is rendered
- **THEN** the arc uses colors from the Tailwind palette
- **AND** the arc color provides sufficient contrast against the background
- **AND** the inactive portion of the circle is visually distinct from the active arc

#### Scenario: No 3D effects
- **WHEN** the knob is rendered
- **THEN** the design does not use skeuomorphic shadows, gradients, or 3D effects
- **AND** the appearance remains flat and consistent with the minimal UI design
