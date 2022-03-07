class UserService {
    authenticate(userData){
        return fetch('https://mrktline.herokuapp.com/user/authenticate', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        } )
    }
    update(userdata){
        const user= JSON.parse(localStorage.getItem('userInfo'));
        const token= `Bearer ${user.token}`;
        return fetch(`https://mrktline.herokuapp.com/user/${userdata.id}`,{
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(userdata)
        })
    }
    get(userdata){
        return fetch('https://mrktline.herokuapp.com/user',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userdata)
        })
    }

    register(userdata){
        return fetch('https://mrktline.herokuapp.com/user/register',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userdata)
        })
    }

    delete(id){
        const user= JSON.parse(localStorage.getItem('userInfo'));
        const token= `Bearer ${user.token}`;
        
        return fetch(`https://mrktline.herokuapp.com/user/${id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({id: id})
        })
    }
}

export default new UserService();