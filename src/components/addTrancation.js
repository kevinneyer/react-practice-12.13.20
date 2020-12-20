import React, { useState } from 'react'
import { Header, Form, Dropdown, Segment } from 'semantic-ui-react'

const AddTransaction = (props) => {

    const[ date, setDate ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ category, setCategory ] = useState('')

    const categoryOptions = [
      {
        key: 'Food & Drink',
        text: 'Food & Drink',
        value: 'Food & Drink'
      },
      {
        key: 'Bills & Utilities',
        text: 'Bills & Utilities',
        value: 'Bills & Utilities'
      },
      {
        key: 'Transportation',
        text: 'Transportation',
        value: 'Transportation'
      },
      {
        key: 'Shopping',
        text: 'Shopping',
        value: 'Shopping'
      }
    ]

    const dateHandler = (e) => {
        setDate(e.target.value)
    }

    const amountHandler = (e) => {
        setAmount(e.target.value)
    }

    const locationHandler = (e) => {
        setLocation(e.target.value)
    }

    const categoryHandler = (e) => {
      setCategory(e.target.innerText)
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
                location,
                category
            })
        })
        .then(res => res.json())
        .then( data => props.addTransaction(data))
        setDate('')
        setAmount('')
        setLocation('')
        setCategory('')
    }

    return(
        <div>
          <Segment>
            <Header as='h3'>Add a Transaction</Header>
            <div>
                <Form onSubmit={addOne}>
                    <Form.Group inline>
                        <Form.Input onChange={dateHandler} value={date} placeholder='Date' />
                        <Form.Input onChange={amountHandler} value={amount} placeholder='Amount' />
                        <Form.Input onChange={locationHandler} value={location} placeholder='Location' />
                        <Form.Input>
                          <Dropdown
                            placeholder='Select Category...'
                            selection
                            options={categoryOptions}
                            onChange={categoryHandler}
                            value={category}
                          />
                        </Form.Input>
                        <Form.Button color='green'>Add Transaction</Form.Button>
                    </Form.Group>
                </Form>
            </div>
          </Segment>
        </div>
    )
}

export default AddTransaction
