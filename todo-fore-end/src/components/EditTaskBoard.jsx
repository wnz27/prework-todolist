import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon, Divider } from 'antd';

const { Column } = Table;

const data = [
  {
    title: '1',
    project: 'John',
    taskPriority: 'Brown',
    tag: 32,
    deadline: 'New York No. 1 Lake Park',
    done: ['nice', 'developer'],
  },
  {
    title: '2',
    project: 'Jim',
    taskPriority: 'Green',
    tag: 42,
    deadline: 'London No. 1 Lake Park',
    done: ['loser'],
  },
  {
    title: '3',
    project: 'Joe',
    taskPriority: 'Black',
    tag: 32,
    deadline: 'Sidney No. 1 Lake Park',
    done: ['cool', 'teacher'],
  },
];

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = { 
            list: data
        };
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
      }
    
    handleEdit(e) {
      console.log('click', e);
    }

    handleDelete(e){
      console.log('click', e);
    }

    render() {
        return(
            <Table dataSource={data}>
            <Column title="taskPriority" dataIndex="taskPriority" key="taskPriority" />
            <Column title="project" dataIndex="project" key="project" />
            <Column title="tag" dataIndex="tag" key="tag" />
            <Column title="title" dataIndex="title" key="title" />
            <Column title="deadline" dataIndex="deadline" key="deadline" />
            <Column title="done" dataIndex="deadline" key="deadline" />
            <Column
            title="Edit"
            key="action"
            render={(text, record) => (
                <span>
                <Icon type="form" onClick={this.handleEdit}/>
                <Divider type="vertical" />
                <Icon type="close-circle" onClick={this.handleDelete}/>
                </span>
            )}
            />
        </Table>
        )
    }

} 

ReactDOM.render(<TaskList />, document.getElementById('root'));

export default TaskList
