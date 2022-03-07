export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Return on Equity - %',
            font: {
                weight: 'bold',
                size: 16
            }
        }
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const data ={
    labels,
    datasets: [
        {
            label: 'RoE',
            data: [],
            backgroundColor: 'rgba(255, 127, 14, 0.8)',
    }
    ]
}