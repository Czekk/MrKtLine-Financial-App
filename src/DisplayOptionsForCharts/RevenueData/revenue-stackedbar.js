export const options = {
    "indexAxis": "y",
    "plugins": {
        "title": {
            "display": true,
            "text": "Revenue - (millions)"
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

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const data = {
    labels,
    datasets: [
        {
            "label": "Interest",
            "data": [],
            "backgroundColor":"rgba(31, 119, 180, 0.7)"
        },
        {
            "label": "Service Charge",
            "data": [],
            "backgroundColor":"rgba(214, 39, 40, 0.7)"
        },
        {
            "label": "Capital Markets",
            "data": [],
            "backgroundColor":"rgba(44, 160, 44, 0.7)"
        },
        {
            "label": "Mortgage",
            "data": [],
            "backgroundColor":"rgba(255, 127, 14, 0.7)"
        },
        {
            "label": "Fees",
            "data": [],
            "backgroundColor":"rgba(148, 103, 189, 0.7)"
        },
        {
            "label": "Other",
            "data": [],
            "backgroundColor":"rgba(140, 86, 75, 0.7)"
        },
    ]
}