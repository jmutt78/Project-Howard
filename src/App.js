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
import User from "./components/Auth/User";
import Signout from "./components/Auth/Signout";
import Reset from "./components/Auth/Reset";

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
    const isLanding =
      window.location.pathname === "/" ||
      window.location.pathname === "/signin" ||
      window.location.pathname === "/forgot" ||
      window.location.pathname === "/signup";
    return (
      <User>
        {({ data }) => (
          <Layout style={{ minHeight: "100vh" }}>
            {!isLanding ? <div></div> : null}

            <Router>
              <Fragment>
                <div>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/forgot" component={Forgot} />
                    <Route exact path="/create-daily" component={CreateDaily} />
                    <Route exact path="/reset" component={Reset} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </Layout>
        )}
      </User>
    );
  }
}

export default App;
