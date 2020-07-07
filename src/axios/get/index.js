
import axios from 'axios';

const Get = (url) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(url)
        .then((result) => {
            resolve(result.data)
        }, (err) => {
            reject(err);    
        })
    });
    return promise;
}

export default Get