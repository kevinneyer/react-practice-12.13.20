import React, { useState } from 'react'
import { Header, Form, Dropdown } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { categoryOptions } from '../categoryOptions'

const AddTransaction = (props) => {

  const[ date, setDate ] = useState(new Date())
  const [ amount, setAmount ] = useState('')
  const [ location, setLocation ] = useState('')
  const [ category, setCategory ] = useState('')

  const dateHandler = (e) => {
      setDate(new Date(e))
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
    e.preventDefault();
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
    <div className='add-transaction'>
      <Header as='h3'>Add a Transaction</Header>
      <Form onSubmit={addOne}>
        <Form.Group inline>
          <Form.Input  >
            < Calendar 
              onChange={dateHandler}
              value={date}
            />
          </Form.Input>
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
  )
}

export default AddTransaction
