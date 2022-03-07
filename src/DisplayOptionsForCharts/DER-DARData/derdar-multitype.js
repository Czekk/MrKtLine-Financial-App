export const labels= ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const options={
    "plugins": {
        "title": {
            "display": true,
            "text": "Debt to Equity Ratio & Debt to Asset Ratio"
        }
    },
    "responsive": true,
    "scales": {
        "x": {
            "stacked": true
        },
        "y": {
            "stacked": true
        }
    }
}

export const data={
    labels,
    "datasets": [
        {
            "type": "bar",
            "label": " Total Debt-M",
            "backgroundColor": "rgba(31, 119, 180, 0.2)",
            "data": [],
            "borderColor":"rgba(31, 119, 180, 0.2)",
            "borderWidth": 2
        },
        {
            "type": "bar",
            "label": " Total Equity-M",
            "backgroundColor": "rgba(255, 127, 14, 0.2)",
            "data": [],
            "borderColor":"rgba(255, 127, 14, 0.2)",
            "borderWidth": 2 
        },
        {
            "type": "bar",
            "label": " Total Assets-M",
            "backgroundColor": "rgba(44, 160, 44, 0.2)",
            "data": [],
            "borderColor":"rgba(44, 160, 44, 0.2)",
            "borderWidth": 2
        },
        {
            "type": "line",
            "label": "Debt to Equity Ratio- %",
            "borderColor": "rgba(214, 39, 40, 1)",
            "backgroundColor": "rgba(214, 39, 40, 1)",
            "borderWidth": 2,
            "fill": false,
            "data": []
        },
        {
            "type": "line",
            "label": "Debt to Asset Ratio- %",
            "borderColor": "rgba(148, 103, 189, 1)",
            "backgroundColor": "rgba(148, 103, 189, 1)",
            "borderWidth": 2,
            "fill": false,
            "data": []
        }

    ]
}