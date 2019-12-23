import { Layout, Menu, Breadcrumb, Icon, PageHeader, Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import CreateTaskButton from '../components/CreateTaskBoard'
import TaskList from '../components/EditTaskBoard'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = { 
            collapsed: false,
            project: [ 'a', 'b', 'c'],
            tag: ['1', '2', '3'],
            priority: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']
        };
        this.onCollapse = this.onCollapse.bind(this);
      }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  /*
  renderProjectSubManu () {
      const projectsData = this.state.project
      return(
        <SubMenu
        key="project"
        title={
          <span>
            <Icon type="form" />
            <span>项目</span>
          </span>
        }
      >
        {projectsData.map((projectType) => {
            return(
                <Menu.Item key={projectType[0]}>{projectType[1]}</Menu.Item>
            )
        })}
      </SubMenu>
      )
  }
  */

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="deadline">
            <Icon type="clock-circle" />
              <span>截止时间</span>
            </Menu.Item>
            <SubMenu
              key="project"
              title={
                <span>
                  <Icon type="book" />
                  <span>项目</span>
                </span>
              }
            >
            {this.state.project.map((projectType) => {
                return(
                    <Menu.Item key={projectType}>{projectType}</Menu.Item>
                )
            })}
            </SubMenu>
            <SubMenu
              key="tag"
              title={
                <span>
                  <Icon type="tags" />
                  <span>标签</span>
                </span>
              }
            >
                {this.state.tag.map((item) => {
                return (
                    <Menu.Item key={item}>{item}</Menu.Item>
                )
                })}
            </SubMenu>
            <SubMenu
              key="priority"
              title={
                <span>
                  <Icon type="ordered-list" />
                  <span>优先级</span>
                </span>
              }
            >
              {this.state.priority.map((item) => {
                return (
                    <Menu.Item key={item}>{item}</Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0 }}>
            <PageHeader
            title="Todolist"
            subTitle="This is a task management"
            extra={[
                <CreateTaskButton />,
            ]}
            >
            </PageHeader>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <TaskList />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>TodoList Desigen ©2019 Created by 27</Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById('root'));

export default SiderDemo

SiderDemo.defaultProps = {
    project: [ 'a', 'b', 'c'],
    tag: ['1', '2', '3'],
    priority: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']
}