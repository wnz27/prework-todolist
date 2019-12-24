import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Popover, Button, Input, Card } from 'antd';
const baseURL = 'http://127.0.0.1:8000'
const { Meta } = Card
const { TextArea } = Input;
const text = <span>Create a task</span>;

class CreateTaskButton extends React.Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = {
            visible: false,
          };
        this.hide = this.hide.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.createTask = this.createTask.bind(this);
      }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  createTask = (e) => {
    axios.post(`${baseURL}/task/operation/create`, {
      new_title: e.target.value,
    })
    .then((response) => {
      console.log(response)
      if (response.data.success > 0){
        this.hide()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Popover
        placement={this.props.placeStyle}
        title={text} 
        content={
            <div>
                <Card
                hoverable
                style={{ width: 400 }}
                cover={<TextArea rows={4} 
                        defaultValue={this.props.oldTitle} 
                        onPressEnter={this.createTask}
                        placeholder={this.props.pleaceHolder}
                        />
                      }
                >
                </Card>
            </div>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button type={this.props.buttonType}>{this.props.buttonName}</Button>
      </Popover>
    );
  }
}

ReactDOM.render(<CreateTaskButton />, document.getElementById('root'));

export default CreateTaskButton