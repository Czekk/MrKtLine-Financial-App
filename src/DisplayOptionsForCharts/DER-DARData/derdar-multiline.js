export const options = {
    responsive: true,
    interaction: {
        mode: "index",
        intersect: false,
    },
    stacked: false,
    "plugins": {
        title: {
            display: true,
            "text": "Debt to Equity Ratio /Debt to Asset Ratio- %",
            font: { 
                size: 16, 
                weight: "bold"
            }
        }
    },
    "scales": {
        y: {
            type: "linear",
            display: true,
            position: "left"
        },
        y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
                drawOnChartArea: false,
            }
        }
    }
}

const labels =["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const data = {
    labels,
    "datasets": [
        {
            "label": "DER",
            "data": [],
            "borderColor": "rgba(148, 103, 189, 0.7)",
            "backgroundColor": "rgba(148, 103, 189, 0.5)",
            "yAxisID": "y"
        },
        {
            "label": "DAR",
            "data": [],
            "borderColor": "rgba(140, 86, 75, 0.7)",
            "backgroundColor": "rgba(140, 86, 75, 0.5)",
            "yAxisID": "y1"
        }
    ]
}