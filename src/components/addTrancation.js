import React, { useState } from 'react'
import { Header, Form } from 'semantic-ui-react'

const AddTransaction = (props) => {

    const[ date, setDate ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ location, setLocation ] = useState('')

    const dateHandler = (e) => {
        setDate(e.target.value)
    }

    const amountHandler = (e) => {
        setAmount(e.target.value)
    }

    const locationHandler = (e) => {
        setLocation(e.target.value)
    }

    const addOne = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                date,
                amount,
                location
            })
        })
        .then(res => res.json())
        .then( data => props.addTransaction(data))
        setDate('')
        setAmount('')
        setLocation('')
    }

    return(
        <div>
            <Header as='h3'>Add a Transaction</Header>
            <div>
                <Form onSubmit={addOne}> 
                    <Form.Group inline>
                        <Form.Input onChange={dateHandler} value={date} placeholder='Date' />
                        <Form.Input onChange={amountHandler} value={amount} placeholder='Amount' />
                        <Form.Input onChange={locationHandler} value={location} placeholder='Location' />
                        <Form.Button color='green'>Add Transaction</Form.Button>
                </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default AddTransaction