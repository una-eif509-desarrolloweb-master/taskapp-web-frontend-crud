import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Alert, Modal, Button} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

import PriorityService from "../services/priority.service";

const {confirm} = Modal;

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 8,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 8,
    },
};

const initialPriorityState = {
    "idPriority": null,
    "label": ""
};

const Priority = (props) => {
    const [form] = Form.useForm();
    const [priority, setPriority] = useState(initialPriorityState);
    const [isNew, setIsNew] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    const fillForm = useCallback(
        () => {
            form.setFieldsValue({
                label: priority.label,
            });
        },
        [form, priority],
    );

    useLayoutEffect(() => {
        setIsNew(props.match.params.id ? false : true);
        retrieveUserById(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        fillForm();
    }, [fillForm]);

    /** Service methods **/

    const retrieveUserById = (idPriority) => {
        if (idPriority) {
            PriorityService.get(idPriority)
                .then(response => {
                    setPriority(response.data)
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            setPriority(initialPriorityState);
        }
    };

    const saveUpdateForm = () => {
        if (isNew) {
            PriorityService.create(priority)
                .then(response => {

                    setPriority(response.data);
                    setSubmitted(true);
                    form.resetFields();
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            PriorityService.update(priority)
                .then(response => {
                    setPriority(response.data);
                    setSubmitted(true);
                    fillForm();
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    };

    const deleteUser = (idPriority) => {
        if (idPriority) {
            PriorityService.remove(idPriority)
                .then(response => {
                    history.push("/user/list");
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    }

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {name, value} = event.target;
        setPriority({...priority, [name]: value});
    };

    const handleClose = () => {
        setPriority(initialPriorityState);
        setSubmitted(false);
    };

    /** General Methods **/
    const onFinish = data => {
        console.log(priority);
        saveUpdateForm();
    };

    const onReset = () => {
        form.resetFields();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this priority?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Priority ['.concat(priority.label).concat(']'),
            onOk() {
                deleteUser(priority.idUser);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="label"
                    label="Label"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="label"
                        onChange={handleInputChange}
                        placeholder="Label"
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

                {submitted ? (
                    <Alert message="Priority Saved" type="success" showIcon closable afterClose={handleClose}/>
                ) : null}

                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
            </Form>
        </div>
    )
};

export default Priority;