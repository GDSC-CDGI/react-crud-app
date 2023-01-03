import React, { useState } from 'react';
import './addUser.css';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ArrowBack from '@material-ui/icons/ArrowBack';

const AddUser = () => {

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

    const addInputUser = async(e) => {
        e.preventDefault();
        const {USER_NAME, USER_EMAIL, USER_DESIGNATION, USER_WORK, USER_MOBILE, USER_ADDRESS, USER_DESC} = inputVal;

        if(USER_NAME === ""){
            alert("Name is required");
        }else if(USER_EMAIL === ""){
            alert("Email is required");
        }else if(!USER_EMAIL.includes("@")){
            alert("Please enter valid email");
        }else if(USER_WORK === ""){
            alert("Work experience is required");
        }else if(USER_ADDRESS === ""){
            alert("Address is required");
        }else if(USER_MOBILE === ""){
            alert("Contact no. is required");
        }else{
            const res = await fetch("/add-user", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    USER_NAME, USER_EMAIL, USER_DESIGNATION, USER_WORK, USER_MOBILE, USER_ADDRESS, USER_DESC
                })
            });
    
            const data = await res.json();
            console.log(data);
    
            if(res.status === 422 || !data){
                alert("error");
                console.log("error");
            }else{
                alert("User added");
            }
        }

    }

    return (
        <div className='container'>
            <div className="mt-5 mb-5">
                <NavLink to="/" className="back-btn"> <ArrowBack /> Back</NavLink>
            </div>
            <Form className='row'>
                <div className='col-6'>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={setData} type="text" name='USER_NAME'  placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userDesignation">
                    <Form.Label>Profile Designation</Form.Label>
                    <Form.Control type="text" onChange={setData} name='USER_DESIGNATION' placeholder="Profile Designation" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userWork">
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Select aria-label="" name='USER_WORK' onChange={setData}>
                        <option value="none">None</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">More</option>
                    </Form.Select>
                </Form.Group>
                
                </div>
                <div className='col-6'>
                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={setData} type="email" name='USER_EMAIL' placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userMobile">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control onChange={setData} type="mobile" name='USER_MOBILE' placeholder="Mobile" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={setData} type="text" name='USER_ADDRESS'  placeholder="Address" />
                </Form.Group>

                </div>
                <div className='row'>
                    <Form.Group className="mb-3" controlId="userDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" onChange={setData} name='USER_DESC' rows={3} />
                    </Form.Group>
                </div>
                
                <div className='row justify-content-center mt-5'>
                    <Button type="submit" onClick={addInputUser} className='col-6 submit-btn'>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddUser;