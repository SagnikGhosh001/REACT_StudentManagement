
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../../components/Base'
import { getUser, updateUser, updateUserPasswordr } from '../../services/user-service'
import userContext from '../../context/userContext'
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
function UpdatePassword() {
    const { id } = useParams()

    const object = useContext(userContext)
    const navigate = useNavigate()
    // console.log(object.user.data.id);
    const [data, setData] = useState(null)
    useEffect(() => {
        getUser(id).then(data => {
            console.log(data);

            setData({ ...data })
        }).catch(error => {
            console.error(error);
        })
    }, [])
    useEffect(() => {
        if (data?.id == object?.user?.data?.id) {
            toast.error("this is not you")
            navigate("/")
        }
    }, [data])

    const [error, setError] = useState({
        errors: {},
        isError: false
    })



    //handle Change
    const handleChange = (event, propertie) => {
        //dynamic setting value
        setData({ ...data, [propertie]: event.target.value })
    }

    //reset form
    const resetData = () => {
        setData(
            {
                password: '',

            }
        )
    }


    //submit form
    const update = (event) => {
        event.preventDefault()

        if (error.isError) {
            toast.error("Already data exist in server...");
            setError({ ...error, isError: false })
            return;
        }
        console.log(data);
        //data validate

        //call server api for sending data
        updateUserPasswordr(id, { ...data }).then((resp) => {
            console.log(resp);
            console.log("sucsess log");
            toast.success("post updated!!")
            setData(
                {
                    userName: '',

                }
            )
        }).catch((error) => {
            console.log(error);
            console.log("Error log");
            //error handle
            setError({
                errors: error,
                isError: true
            })
        })
            ;
    }
    const updateHtml = () => {
        return (
            <Container >
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                            <CardHeader>

                                <h3><u><i>Fill Information to Update !!</i></u></h3>
                            </CardHeader>
                            <CardBody>

                                <Form onSubmit={update}>
                                    {/* Password field */}
                                    <FormGroup>
                                        <Label for="password">Password:</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            required="required"
                                            id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            // invalid={error.errors?.response?.data?.password ? true : false}
                                        />
                                    </FormGroup>
                                    <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>

                                    <Container className="text-center">
                                        <Button outline color="primary">Update</Button>
                                        <Button outline color="danger" className="ms-2" type="reset" onClick={resetData}>Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
  return (
    <Base>
      <Row>
        <Col>
          <div>{data && updateHtml()}</div>
        </Col>
      </Row>
    </Base>
    
  )
}

export default UpdatePassword