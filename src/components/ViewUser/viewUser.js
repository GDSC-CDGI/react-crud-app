import './viewUser.css';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, Outlet, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

const ViewUser = () => {

    const [getUserData, setUserData] = useState([]);
    // console.log("user" + getUserData);

    const {id} = useParams("");
    // console.log(id);

    const getData = async () => {
        const res = await fetch(`/view-user/${id}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 404 || !data){
            console.log("Error");
            alert("Error");;
        }else{
            setUserData(data[0]);

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
        <div className='container mt-5'>
            <Card>
                <Card.Header as="h5">Hello {getUserData.USER_NAME} </Card.Header>
                <Card.Body>
                    <Card.Title>Name : {getUserData.USER_NAME}</Card.Title>
                    <Row>
                        <Col>
                            <Card.Text className='col-5'>
                                <h5>Work Experience : {getUserData.USER_WORK} </h5>
                                <h5>Email : {getUserData.USER_EMAIL} </h5>
                                <h5>Profession : {getUserData.USER_DESIGNATION} </h5>
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className='col-6'>
                                <h5>Mobile : {getUserData.USER_MOBILE} </h5>
                                <h5>Location : {getUserData.USER_ADDRESS} </h5>
                                <h5>Description : {getUserData.USER_DESC} </h5>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Button className="update-btn" variant="outline-primary"><Link to={`/edit-user/${getUserData.USER_ID}`} ><EditIcon /></Link></Button>
                    <Button className="delete-btn" variant="outline-danger" onClick={() => { removeUser(getUserData.USER_ID) }}><CloseIcon /></Button>
                </Card.Body>
            </Card>

            <Outlet />
        </div>
    );
}


export default ViewUser;