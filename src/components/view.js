import React, { useState } from 'react'
import { Table, Button, Container, Modal, Header, TextArea } from 'semantic-ui-react'

const View = (props) => {
  
  const{ transactions, deleteHandler } = props
  const amounts = transactions.map(transaction => parseFloat(transaction.amount))
  let total = amounts.reduce((a,b) => (a+ b), 0)

  const [open, setOpen ] = useState(false)
  const [comment, setComment] = useState('')
  const [id, setId] = useState(null)

  const commentChangeHandler = (e) => {
    setComment(e.target.value)
  }

  const idHandler = (e) => {
    setId(e.target.id)
  }

  const clearId = () => {
    setId(null)
    setOpen(false)
  }

  const commentSubmitHandler = (id) =>{
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application.json'
      },
      body: JSON.stringify({
        comments: comment
      })
    })
    .then(res => res.json())
    .then(data => props.updateComment(data))
    setOpen(false)
    setComment('')
    setId(null)
  }

  const deleteComment = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application.json'
      },
      body: JSON.stringify({
        comments: null
      })
    })
    .then(res => res.json())
    .then(data => props.updateComment(data))
  }

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
                    <Table.HeaderCell>Comments</Table.HeaderCell>
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
                  {transaction.comments ? 
                  (<Table.Cell>
                    {transaction.comments}
                    <Button color='black' onClick={() => deleteComment(transaction.id)}>Delete</Button>
                  </Table.Cell>)
                  :
                  (<Table.Cell textAlign='center'>
                    <Modal
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={<Button id={transaction.id} color='blue' onClick={idHandler}>Add a Comment</Button>}
                    >
                      <Modal.Header>Write a Comment</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <TextArea onChange={commentChangeHandler}/>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color='black' onClick={clearId}>
                          Cancel
                        </Button>
                        <Button
                          labelPosition='right'
                          content='Add Comment'
                          icon='checkmark'
                          onClick={() => commentSubmitHandler(id)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Table.Cell>)
                  }
                  <Table.Cell textAlign='center'>
                      <Button id={transaction.id} onClick={() => deleteHandler(transaction.id)} color='red'>Remove</Button>
                  </Table.Cell>
                </Table.Row>
              )}
              <Table.Row>
              <Table.Header>
                <Table.HeaderCell>Total Spent</Table.HeaderCell>
                <Table.Cell>{total.toFixed(2)}</Table.Cell>
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
