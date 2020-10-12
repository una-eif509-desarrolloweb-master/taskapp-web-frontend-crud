    import React, {useState, useEffect} from "react";
import {Form, Alert, Input, Button} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';

import UserService from "../services/user.service";

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 3,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 8,
    },
};

const initialUserState = {
    "idUser": null,
    "firstName" : "",
    "lastName" : "",
    "email" : "",
    "username": "",
    "password": ""
};

const Signup = (props) => {
    const [form] = Form.useForm();
    const [user, setUser] = useState(initialUserState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    /** Service methods **/
    const signUpMethod = () => {
        UserService.signup(user)
            .then(response => {
                setUser(response.data);
                form.resetFields();
                setError(false);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    /** General Methods **/

    const onFinish = data => {
        console.log(user);
        signUpMethod();
    };

    const onReset = () => {
        setUser(initialUserState);
        form.resetFields();
    };

    return (
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="firstName"
                        onChange={handleInputChange}
                        placeholder="First Name"
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="lastName"
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="username"
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        onChange={handleInputChange}
                        placeholder="User Name"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password
                        name="password"
                        onChange={handleInputChange}
                        placeholder="your password"
                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            {user.idUser > 0 ? (
                <Alert message="User Saved" type="success" showIcon closable />
            ) : null}
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Signup;