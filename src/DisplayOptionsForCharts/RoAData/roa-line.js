

export const options = {
    "responsive": true,
    "plugins": {
        "legend": {
            "position": "top"
        },
        "title": {
            "display": true,
           "text": "Return on Assets",
            "font": { "size": 16}
        },
        "xAxisID": "Month",
        "yAxisID": "RoA rate"
    }
} 

const labels =["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const data = {
    labels,
    "datasets": [
        {
            "label": "RoA index",
            "data": [],
            "borderColor": "rgba(31, 119, 180, 0.7)",
            "backgroundColor": "rgba(31, 119, 180, 0.5)",
        }
    ]
}