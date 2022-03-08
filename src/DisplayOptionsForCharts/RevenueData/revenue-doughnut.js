
export const options = {
    "responsive": true,
    "plugins": {
        "legend": {
            "position": "right", 
            "title": {
                "display": true, 
                "text": "Revenue - %",
                "font": {
                    "weight": "bold",
                    "size": 16
                }
                }
                }
            },
    "animation":{"animateScale": "true"},
    "cutout": "60%",
    "hoverBackgroundColor": ["rgba(31, 119, 180, 1)",
    "rgba(214, 39, 40, 1)",
    "rgba(44, 160, 44, 1)",
    "rgba(255, 127, 14, 1)",
    "rgba(148, 103, 189, 1)",
    "rgba(140, 86, 75, 1)"],
    "hoverOffset": ["10"],
    "weight":[1]
        }

export const data ={
    "labels": ["Ints't", "Serv. Chrg", "Cap. Mark'ts", "Mortgage", "fees", "Other"],
    "datasets":[
        {
           "label": "Revenue",
            "data": [],
            "backgroundColor": [
                "rgba(31, 119, 180, 0.7)",
                "rgba(214, 39, 40, 0.7)",
                "rgba(44, 160, 44, 0.7)",
                "rgba(255, 127, 14, 0.7)",
                "rgba(148, 103, 189, 0.7)",
                "rgba(140, 86, 75, 0.7)"
            ],
            "borderColor": [
                "rgba(31, 119, 180, 1)",
                "rgba(214, 39, 40, 1)",
                "rgba(44, 160, 44, 1)",
                "rgba(255, 127, 14, 1)",
                "rgba(148, 103, 189, 1)",
                "rgba(140, 86, 75, 1)"
            ],
            "borderWidth": 1
        }
    ]
}