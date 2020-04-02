import React, { Fragment } from "react";
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Auth/Signup";
import Forgot from "./components/Auth/Forgot";
import Nav from "./components/Nav";
import CreateDaily from "./components/Daily/CreateDaily";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    console.log(this.props);
    const isLanding =
      window.location.pathname === "/" ||
      window.location.pathname === "/signin" ||
      window.location.pathname === "/forgot" ||
      window.location.pathname === "/signup";
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {!isLanding ? (
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          ></Sider>
        ) : null}
        <Router>
          <Fragment>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/create-daily" component={CreateDaily} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Layout>
    );
  }
}

export default App;
