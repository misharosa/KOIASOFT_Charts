import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'KOIASOFT',
        },
    },
};

export function ChartBar({ chartDataFromServer }:any) {
    const labels = chartDataFromServer.map((item:any) => item.name)
    const data = {
        labels,
        datasets: [
            {
                label: 'Price',
                data: chartDataFromServer.map((item:any) => item.pv),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Bar height={'80%'} options={options} data={data} />;
}