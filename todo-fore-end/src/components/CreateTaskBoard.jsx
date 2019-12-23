import React from 'react';
import ReactDOM from 'react-dom';
import { Popover, Button, Input, Card } from 'antd';

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
        this.handleVisibleChange = this.handleVisibleChange.bind(this)
      }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    return (
      <Popover
        placement="leftTop" 
        title={text} 
        content={
            <div>
                <Card
                hoverable
                style={{ width: 400 }}
                cover={<TextArea rows={4} />}
                >
                <Button type="primary" onClick={this.hide}>Primary</Button>
                </Card>
            </div>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button type="primary">Add Task</Button>
      </Popover>
    );
  }
}

ReactDOM.render(<CreateTaskButton />, document.getElementById('root'));

export default CreateTaskButton