class DataService {
    get(period, requestOptions){
        return fetch(`https://mrktline.herokuapp.com/api/v1/data?period=${period}`,requestOptions);
    }
}

export default new DataService();