import axios from 'axios';

//'https://stock-market-system.herokuapp.com/'
//'http://localhost:5000'

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const addFollow = (formData) => API.post('/user/updateFollowerList', formData);
export const getUser = (userid) => API.get(`/user/getUser/${userid}`);
export const getUsers = () => API.get(`/user/getUsers`);
// export const getFollowingList = () => API.get(`/user/getFollowingList`);

export const addTweet = (tweet) => API.post(`/addTweet/addTweet`, tweet);
export const getTweet  = (userid) => API.get(`/addTweet/getTweet/${userid}`);
