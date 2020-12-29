import React, { useState } from 'react'
import { Table, Button, Container, Modal, Header, TextArea } from 'semantic-ui-react'

const View = (props) => {
  
  const{ transactions, deleteHandler } = props
  const amounts = transactions.map(transaction => parseInt(transaction.amount))
  let total = amounts.reduce((a,b) => (a+ b), 0)

  const [open, setOpen ] = useState(false)
  const [comment, setComment] = useState('')

  const commentChangeHandler = (e) => {
    setComment(e.target.value)
  }

  const commentSubmitHandler = (id) =>{
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application.json'
      },
      body: JSON.stringify({
        content: comment,
        transaction_id: id
      })
    })
    .then(res => res.json())
    .then(comment => props.addComment(comment))
    setOpen(false)
    setComment('')
  }

  console.log(amounts)

  return(
    <div>
      <Container fluid>
        {transactions.length > 0 ? 
          <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Add Comment</Table.HeaderCell>
                    <Table.HeaderCell>Remove</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
              {transactions.map(transaction =>
                <Table.Row>
                  <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{transaction.amount}</Table.Cell>
                  <Table.Cell>{transaction.location}</Table.Cell>
                  <Table.Cell>{transaction.category}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Modal
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={<Button color='blue'>Add Comment</Button>}
                    >
                      <Modal.Header>Write a Comment</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <TextArea onChange={commentChangeHandler}/>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color='black' onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          content="Submit"
                          labelPosition='right'
                          icon='checkmark'
                          onClick={() => commentSubmitHandler(transaction.id)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                      <Button id={transaction.id} onClick={() => deleteHandler(transaction.id)} color='red'>Remove</Button>
                  </Table.Cell>
                </Table.Row>
              )}
              <Table.Row>
              <Table.Header>
                <Table.HeaderCell>Total Spent</Table.HeaderCell>
                <Table.Cell>{total}</Table.Cell>
                </Table.Header>
              </Table.Row>
            </Table.Body>
          </Table>
        :
          <Header textAlign='center' as='h3'>No Transactions for {props.month}!</Header>
        }
      </Container>
    </div>
  )
}

export default View
