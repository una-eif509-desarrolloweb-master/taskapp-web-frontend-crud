import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Alert, Table} from 'antd';

import PriorityService from "../services/priority.service";

const initialPriorityListState = [
    {
        "idPriority": 0,
        "label": ""
    }
];

const PriorityList = (props) => {
    const [priorityList, setPriorityList] = useState(initialPriorityListState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllPrioritiesMethod();
    },[]);

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        PriorityService.getAll()
            .then(response => {
                setPriorityList(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'Priority',
            render: (priority) =>
                <Link
                    to={"/priority/add/" + priority.idPriority}
                >
                    {priority.label}
                </Link>
        }
    ];

    const redirect = () => {
        if (error.response.status === 401) {
            props.history.push("/login");
            window.location.reload();
        }
    }

    return (
        <div>
            {error  ?
                redirect()
                :
                <Table rowKey={priorityList => priorityList.idPriority} columns={columns} dataSource={priorityList}/>
            }
        </div>
    )
};

export default PriorityList;