export const labels= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export const data = {
    labels,
    datasets:[
        {
            type: 'bar',
            label: 'Current Assets',
            backgroundColor: 'rgba(148, 103, 189, 0.5)',
            data: [],
            borderColor: 'rgba(148, 103, 189, 0.5)',
            borderWidth: 2
        },
        {
            type: 'bar',
            label: 'Current Liability',
            backgroundColor: 'rgba(140, 86, 75, 0.8)',
            data: []
        },
        {
            type: 'line',
            label: 'Working Capital Ratio',
            data: [],
            borderColor: 'rgba(214, 39, 40, 0.8)',
            backgroundColor:'rgba(214, 39, 40, 0.8)',
            borderWidth: 2,
            fill: false
        }
    ]
}
