import React, { useEffect, useState } from "react";
import './home.css';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { Link, Outlet } from "react-router-dom";

const Home = () => {

    const [getUserData, setUserData] = useState([]);
    // console.log(getUserData);

    const getData = async(e) => {
        // e.preventDefault();

        const res = await fetch("/user", {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const data = await res.json();
        // console.log(data);

        if(res.status === 404 || !data){
            console.log("Error");
            alert("Error");
        }else{
            setUserData(data);
            // console.log("Get data");
        }

    }

    const removeUser = async (id) => {
        const remove = await fetch(`/remove-user/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const removeData = await remove.json();
        console.log(removeData);

        if(remove.status === 422 || !removeData){
            console.log("error");
        }else{
            alert("User removed");
            removeUser(removeData);
            getData();
        }

    }


    useEffect( () => {
        getData();
    }, [])

    return (
        <div className="container">
            <div className="container mt-5">
                <Link to="/add-user" className="add-user-btn" variant="success">Add User</Link>
            </div>

            <Table striped bordered hover >
                <thead>
                    <tr className="table-dark text-center">
                        <th>Id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Profile Designation</th>
                        <th>Contact</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                {
                    getUserData.map((element, id) => {
                        return(
                            <>
                                <tr>
                                    <td>{id+1}</td>
                                    <td>{element.USER_NAME}</td>
                                    <td> {element.USER_EMAIL} </td>
                                    <td> {element.USER_DESIGNATION} </td>
                                    <td> {element.USER_MOBILE} </td>
                                    <td className="d-flex justify-content-between">
                                        <Button className="view-btn" variant="outline-success"><Link to={`/view-user/${element.USER_ID}`} ><VisibilityIcon /></Link></Button>
                                        <Button className="update-btn" variant="outline-primary"><Link to={`/edit-user/${element.USER_ID}`} ><EditIcon /></Link> </Button>
                                        <Button className="delete-btn" variant="outline-danger" onClick={() => removeUser(element.USER_ID)}><CloseIcon /></Button>
                                    </td>
                                </tr>            
                            </>
                        )
                    })

                }   
                </tbody>
            </Table>

            <Outlet />
        </div>
    );
}

export default Home;