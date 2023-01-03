import React, { useContext, useEffect, useState } from 'react';
import './editUser.css';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowBack from '@material-ui/icons/ArrowBack';
// import UpdateData from 

const EditUser = () => {

    // const [upData, setUpData] = useContext(UpdateData);

    const [inputVal, setInputVal] = useState({
        USER_NAME : "", 
        USER_EMAIL : "",
        USER_DESIGNATION : "",
        USER_WORK : "",
        USER_MOBILE : "",
        USER_ADDRESS : "",
        USER_DESC : ""
    })


    const setData = (e) => {
        setInputVal((preVal) => {
            return {
                ...preVal,
                [e.target.name] : e.target.value
            }
        })
    }

    const {id} = useParams("");
    console.log(id);

    const getData = async () => {
        const res = await fetch(`/view-user/${id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            console.log("error");
        }else{
            setInputVal(data[0]);
            console.log("get data");
        }
    }

    useEffect( () => {
        getData();
    }, []);

    const updateUser = async(e) => {
        e.preventDefault();
        const {USER_NAME, USER_EMAIL, USER_DESIGNATION, USER_WORK, USER_MOBILE, USER_ADDRESS, USER_DESC} = inputVal;

        const res2 = await fetch(`/edit-user/${id}`, {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    USER_NAME, USER_EMAIL, USER_DESIGNATION, USER_WORK, USER_MOBILE, USER_ADDRESS, USER_DESC
                })
            }
        )

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            // setUpData(data2);
            alert("User data updated successfully");
        }
    };


    return (
        <div className='container'>
            <div className="mt-5 mb-5">
                <NavLink to="/" className="back-btn"> <ArrowBack /> Back</NavLink>
            </div>
            <Form className='row'>
                <div className='col-6'>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={setData} value={inputVal.USER_NAME}  type="text" name='USER_NAME'  placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Profile Designation</Form.Label>
                    <Form.Control onChange={setData} type="text" value={inputVal.USER_DESIGNATION} name='USER_DESIGNATION' placeholder="Profile Designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Select aria-label="" onChange={setData} value={inputVal.USER_WORK} name="USER_WORK">
                        <option value="1">None</option>
                        <option value="2">One</option>
                        <option value="3">Two+</option>
                    </Form.Select>
                </Form.Group>
                
                </div>
                <div className='col-6'>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={setData} value={inputVal.USER_EMAIL} name='USER_EMAIL' placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control type="mobile" onChange={setData} value={inputVal.USER_MOBILE} name='USER_MOBILE' placeholder="Mobile" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" onChange={setData} value={inputVal.USER_ADDRESS} name='USER_ADDRESS'  placeholder="Address" />
                </Form.Group>

                </div>
                <div className='row'>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" onChange={setData} value={inputVal.USER_DESC} name='USER_DESCRIPTION' rows={3} />
                    </Form.Group>
                </div>
                
                <div className='row justify-content-center mt-5'>
                    <Button onClick={updateUser} type="submit" className='col-6 submit-btn'>
                        Submit
                    </Button>
                </div>
            </Form>
            <Outlet/>
        </div>
    );
}

export default EditUser;