export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Working Capitol Ratio',
            font: {
                weight: 'bold',
                size: 16
            }
        }
    }
}

const labels= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            label: 'WCR',
            data:[],
            borderColor: 'rgba(214, 39, 40, 0.7)',
            backgroundColor: 'rgba(214, 39, 40, 0.7)'
        }
    ]
}