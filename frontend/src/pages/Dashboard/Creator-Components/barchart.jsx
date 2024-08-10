// BarChart.js
import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the chart components
Chart.register(...registerables);

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      boxShadow="md"
      bg="white"
    >
      <canvas ref={chartRef} />
    </Box>
  );
};

export default BarChart;
