import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}s`;
}

export default function DiscreteSlider({
  onChange,
}: {
  onChange: (event: Event, value: number) => void;
}) {
  const onChangeHandler = (event: Event, value: number | number[]) => {
    onChange(event, (value as number) * 1000);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label='Update time'
        defaultValue={5}
        valueLabelDisplay='auto'
        // valueLabelFormat={`seconds`}
        step={5}
        marks
        min={5}
        max={60}
        onChange={onChangeHandler}
      />
    </Box>
  );
}
