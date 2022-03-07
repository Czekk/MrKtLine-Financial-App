export const options = {
    "responsive": true,
    "plugins": {
        "legend":{"position": "top"},
        "title": {
            "display": true,
            "text": "Return on Assets Index"
        }
    }
}

export const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const data= {
    labels,
    datasets: [
        {
            label: "Net Income",
            data: [],
            borderColor: "rgba(31, 119, 180, 0.8)",
            backgroundColor: "rgba(31, 119, 180, 0.5)"
        },
        {
            label: "Total Assets",
            data: [],
            borderColor: "rgba(255, 127, 14, 0.8)",
            backgroundColor: "rgba(255, 127, 14, 0.5)"
        },
        {
            label: "Roa Index",
            data: [],
            borderColor: "rgba(140, 86, 75, 0.8)",
            backgroundColor: "rgba(140, 86, 75, 0.5)"
        },
    ]
}
