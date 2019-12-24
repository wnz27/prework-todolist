import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000'
const pageNum = 1

const getTaskListByDeadline=() => {
    axios.get(`${baseURL}/task/list/deadline/${pageNum}`)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error);
        });
}


export {getTaskListByDeadline}

