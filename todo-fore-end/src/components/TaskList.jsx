import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import CreateTaskButton from './CreateTaskBoard'
import { Table, Icon, Divider, Popconfirm, Radio, Popover, Button, Input, Alert} from 'antd';
import { getTaskListByDeadline } from '../requestData/MyRequestByAxios'

const baseURL = 'http://127.0.0.1:8000'
const pageNum = 1
const { Column } = Table;
const { TextArea } = Input;
const text = <span>Create a task</span>;

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = { 
            list: [],
            visible: false
        };
        this.handleDelete = this.handleDelete.bind(this)
        this.taskDone = this.taskDone.bind(this)
      }

    componentDidMount(){
      axios.get(`${baseURL}/task/list/deadline/${pageNum}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          list: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    taskDone(task_id) {
      axios.post(`${baseURL}/task/operation/done/${task_id}`, {
        new_done: true,
      })
      .then((response) => {
        console.log(task_id)
        if (response.data.error == 0){
          return <Alert message="Done Failed!" type="error" />
        }
        else {
          axios.get(`${baseURL}/task/list/deadline/${pageNum}`)
            .then((response) => {
              console.log(response.data)
              this.setState({
                list: response.data,
                visible: false
              })
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleDelete(task_id){
      console.log(task_id)
      axios.delete(`${baseURL}/task/operation/destory/${task_id}`)
      .then((response) => {
        console.log(response.data)
        if (response.data.error == 0){
          return <Alert message="Delete Failed!" type="error" />
        }
        else {
          axios.get(`${baseURL}/task/list/deadline/${pageNum}`)
            .then((response) => {
              console.log(response.data)
              this.setState({
                list: response.data
              })
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    render() {
        return(
            <Table dataSource={this.state.list}>
            <Column title="taskPriority" dataIndex="taskPriority" key={this.state.list.taskId} />
            <Column title="project" dataIndex="project" key={this.state.list.taskId} />
            <Column title="tag" dataIndex="tag" key={this.state.list.taskId} />
            <Column title="title" dataIndex="title" key={this.state.list.taskId} />
            <Column title="deadline" dataIndex="deadline" key={this.state.list.taskId} />
            <Column title="done" dataIndex="done" key={this.state.list.taskId} />
            <Column
            title="Edit"
            key={this.state.list.taskId}
            render={(text, record) => (
                <span>
                <CreateTaskButton 
                oldTitle={record.title} 
                buttonName="Edit"
                placeStyle="left"
                />
                <Divider type="vertical" />
                <Popconfirm title="Are you sure？" okText="Yes"
                            cancelText="No" onConfirm={() => this.handleDelete(record.taskId)}
                >
                <a href="#"><Icon type="close-circle"/></a>
                </Popconfirm>
                <Divider type="vertical" />
                <Radio onChange={() => this.taskDone(record.taskId)} checked={this.state.visible}>Done?</Radio>
                </span>
            )}
            />
        </Table>
        )
    }

} 

ReactDOM.render(<TaskList />, document.getElementById('root'));

export default TaskList
