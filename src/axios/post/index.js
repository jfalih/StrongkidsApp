
import axios from 'axios'

const Post = (url, data, config = []) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${url}`, data, config)
        .then((result) => {
            resolve(result.data)
        }, (err) => {
            reject(err);
        })
    });
    return promise;
}

export default Post;