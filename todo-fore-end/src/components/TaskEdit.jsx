import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Button, Modal, Form, Input, DatePicker, Select, Alert } from 'antd';

const baseURL = 'http://127.0.0.1:8000'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;
      return (
        <Modal
          visible={visible}
          title="Edit a task!"
          okText="Edit Done"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('new_title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                initialValue: this.props.deaultTitle
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tag">
              {getFieldDecorator('new_tag', {
                initialValue: this.props.deaultTag
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Project">
              {getFieldDecorator('new_project', {
                  initialValue:this.props.deaultProject
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Priority">
                {getFieldDecorator('new_priority', {
                    rules: [{ message: 'Please select your priority!' }],
                })(
                    <Select
                    placeholder="Select a option and change input text above"
                    onChange={this.handleSelectChange}
                    >
                    {['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4'].map((item => {
                        return(
                            <Option value={item}>{item}</Option>
                        )
                    }))}
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="Deadline">
              {getFieldDecorator('new_deadline')(<DatePicker />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
        values['new_deadline'] = values['new_deadline'].format('YYYY-MM-DD')
      if (err) {
        return;
      }
      axios.post(`${baseURL}/task/operation/edit/${this.props.taskId}`, {
        new_title: values['new_title'],
        new_tag: values['new_tag'],
        new_project: values['new_project'],
        new_priority: values['new_priority'],
        new_deadline: values['new_deadline']
      })
      .then((response) => {
          this.context.log(response.data)
        if (response.data.error === 0){
          return <Alert message="Edit Failed!" type="error" />
        }
        else {
          return <Alert message="Edit Success!!" type="success" />

        }
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          {this.props.buttonName}
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          deaultTitle={this.props.defaultTitle}
          deaultTag={this.props.defaultTag}
          deaultProject={this.props.defaultProject}
        />
      </div>
    );
  }
}

ReactDOM.render(<CollectionsPage />, document.getElementById('root'));

export default CollectionsPage

/*
const text = <span>Edit a task</span>;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
const formTailLayout = {
labelCol: { span: 4 },
wrapperCol: { span: 8, offset: 4 },
};
  
class TaskEditComponent extends React.Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = {
            visible: false,
            checkNick: false,
          };
        this.hide = this.hide.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.editTask = this.editTask.bind(this);
      }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  editTask = (e) => {
    
  }

  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['nickname'], { force: true });
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Popover
        placement={this.props.placeStyle}
        title={text} 
        content={
            <div>
            <Form.Item {...formItemLayout} label="title">
                {getFieldDecorator('title', {
                rules: [
                    {
                    required: true,
                    message: 'Please input your name',
                    },
                ],
                })(<Input placeholder="Please input your name" />)}
            </Form.Item>
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

ReactDOM.render(<TaskEditComponent />, document.getElementById('root'));

export default TaskEditComponent
*/