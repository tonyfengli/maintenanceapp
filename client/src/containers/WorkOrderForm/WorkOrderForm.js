import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import axios from "axios"; 
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import {Route, withRouter} from "react-router-dom";
import FormInput from "../../components/UI/FormInputs/FormInputs";
import {Form, Button} from 'react-bootstrap';


class WorkOrderForm extends Component {


    state = {
        workOrderForm: {
            title: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter a brief description'
                },
                value: ''
            },
            category: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Category'
                },
                value: ''
            },
            location: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location'
                },
                value: ''
            }
        }
    }

    //logic to set the state of whatever user types into the forms
    inputChangedHandler = (event, inputIdentifier) => {
        const workOrderForm = {
            ...this.state.workOrderForm
        };
        const workOrderFormElement = { 
            ...workOrderForm[inputIdentifier]
        };
        workOrderFormElement.value = event.target.value;
        workOrderForm[inputIdentifier] = workOrderFormElement;
        this.setState({workOrderForm: workOrderForm});
    }

    // sends work order data to SQL via Sequelize
    // if no employee is logged in, the userID is, by default, set to "69"
    // otherwise, it grabs the userID via Redux (via mapStateToProps)
    workOrderSubmit = () => {
        
        const url = "/api/workorders";

        const workOrderData = {};

        let userID = 69

        if (this.props.userID) {
            userID = this.props.userID
        }

        for (let formElementIdentifier in this.state.workOrderForm) {
            workOrderData[formElementIdentifier] = this.state.workOrderForm[formElementIdentifier].value;
        }

        workOrderData.UserinfoId = userID
        

        axios.post(url, workOrderData)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        });


    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.workOrderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.workOrderForm[key]
            });
        }

        let form = (
            formElementsArray.map(formElement => (
                <FormInput 
                    key={formElement.id}
                    heading = {formElement.id}
                    placeholder = {formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );


        return (
            <Aux>
                <Form>
                    {form}
                    <Button
                        onClick = {this.workOrderSubmit}> Submit </Button>
                </Form>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        userID: state.auth.userId
    }
}


export default withRouter(connect(mapStateToProps, null)(WorkOrderForm));