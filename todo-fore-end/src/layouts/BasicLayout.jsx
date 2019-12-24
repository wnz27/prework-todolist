import { 
    Layout, 
    Menu, 
    Breadcrumb, 
    Icon, 
    PageHeader, 
    Button 
  } from 'antd';
import React,  { useState }  from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import CreateTaskButton from '../components/CreateTaskBoard'
import TaskList from '../components/TaskList'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { type, typeStr, pageNum } = useParams();
    return (
      <div>
        <h3>type: {type}</h3>
        <h3>typeStr: {typeStr}</h3>
        <h3>pageNum: {pageNum}</h3>
      </div>
    );
  }

export default function SiderDemo(props) {
    const [collapsed, onCollapse] = useState(false)
    const [project, setProject] = useState([ 'a', 'b', 'c'])
    const [tag, setTag] = useState(['1', '2', '3'])
    const [priority, setPriority] = useState(['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4'])

    return (
        <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(collapsed)}>
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
              {[ 'a', 'b', 'c'].map((projectType) => {
                  return(
                      
                      <Menu.Item key={projectType}>
                      {projectType}
                      </Menu.Item>
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
                  {['1', '2', '3'].map((item) => {
                  return (
                      <Menu.Item key={item}>
                      
                      {item}

                      </Menu.Item>
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
                {['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4'].map((item) => {
                  return (
                      <Menu.Item key={item}>
                      
                      {item}
                      
                      </Menu.Item>
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
                  <CreateTaskButton 
                        buttonName="Add Task" 
                        pleaceHolder="please enter your task!"
                        buttonType="primary"
                        placeStyle="leftTop"
                  />,
              ]}
              >
              </PageHeader>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <TaskList/>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TodoList Desigen ©2019 Created by 27</Footer>
          </Layout>
        </Layout>
        </Router>
      );
}

/*
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
  
  render() {
      return (
        <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(collapsed)}>
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
              {{project}.map((projectType) => {
                  return(
                      
                      <Menu.Item key={projectType}>
                      <Link to={`/project/${projectType}/1`}>
                      {projectType}
                      </Link>
                      </Menu.Item>
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
                  {{tag}.map((item) => {
                  return (
                      <Menu.Item key={item}>
                      <Link to={`/tag/${item}/1`}>
                      {item}
                      </Link>
                      </Menu.Item>
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
                {{priority}.map((item) => {
                  return (
                      <Menu.Item key={item}>
                      <Link to={`/priority/${item}/1`}>
                      {item}
                      </Link>
                      </Menu.Item>
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
              <Switch>
                  <Route path="/:type/:typeStr/:pageNum" children={<Child />} />
              </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TodoList Desigen ©2019 Created by 27</Footer>
          </Layout>
        </Layout>
        </Router>
      );
  }
}
ReactDOM.render(<SiderDemo />, document.getElementById('root'));
export default SiderDemo
*/

SiderDemo.defaultProps = {
    project: [ 'a', 'b', 'c'],
    tag: ['1', '2', '3'],
    priority: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']
}