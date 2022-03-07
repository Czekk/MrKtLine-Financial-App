export const labels =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export const data={
    labels,
    datasets: [
        {
            label: 'Net Income-M',
            data: [],
            backgroundColor: 'rgba(31, 119, 180, 0.2)',
            borderColor: 'rgba(31, 119, 180, 1)',
            borderWidth: 1
        },
        {
            label: 'Shareholder\'s Equity-M',
            data: [],
            backgroundColor: 'rgba(255, 127, 14, 0.2)',
            borderColor: 'rgba(255, 127, 14, 1)',
            borderWidth: 1
        },
        {
            label: 'Return on Equity-%',
            data: [],
            backgroundColor: 'rgba(214, 39, 40, 0.2)',
            borderColor: 'rgba(214, 39, 40, 1)',
            borderWidth: 1
        },
    ]
}