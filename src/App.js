import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Priority from "./components/Priority";
import PriorityList from "./components/PriorityList";
import Signup from "./components/Signup";

function App() {
    const {Header, Content, Footer} = Layout;
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to={"/priority"}>
                                Priority
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={"/signup"}>
                                Sign up
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/priority" component={PriorityList}/>
                            <Route exact path="/priority/add" component={Priority} />
                            <Route path="/priority/add/:id" component={Priority} />
                            <Route exact path="/signup" component={Signup}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>www.mikeguzman.info</Footer>
            </Layout>
        </Router>
    );
}

export default App;