import React, { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function ExerciseChart({
    inputData = [],
    inputLabel = "",
    inputLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    pointFillColor = "rgba(75, 192, 192, 0.2)",
    lineColor = "rgba(75, 192, 192, 1)",
    graphHeight = "400px"
}) {
    const chartRef = useRef(null); // Reference to the canvas element
    const chartInstance = useRef(null); // Reference to the Chart.js instance


    useEffect(() => {
        if (chartRef.current) {
            // Destroy the chart instance if it already exists (to avoid duplicates)
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Initialize the chart
            chartInstance.current = new Chart(chartRef.current, {
                type: "line", // Chart type (e.g., 'bar', 'line', 'pie', etc.)
                data: {
                    labels: inputLabels,
                    datasets: [
                        {
                            label: inputLabel,
                            data: inputData, // Example data
                            backgroundColor: pointFillColor, // Bar color
                            borderColor: lineColor, // Border color
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: "100%", height: graphHeight }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
