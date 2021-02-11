import React, { useState } from 'react'
import { Table, Button, Container, Modal, Header, TextArea, Tab } from 'semantic-ui-react'

const View = (props) => {
  
  const{ transactions, deleteHandler, updateComment, month } = props
  const amounts = transactions.map(transaction => transaction.type === 'withdrawl' ? parseFloat(transaction.amount) : null)
  const total = amounts.reduce((a,b) => (a+ b), 0)
  const deposits = transactions.map(transaction => transaction.type === 'deposit' ? parseFloat(transaction.amount) : null)
  const depositTotal = deposits.reduce((a,b) => (a+b), 0)
  let balance = 0

  const [ open, setOpen ] = useState(false)
  const [ comment, setComment ] = useState('')
  const [ id, setId ] = useState(null)
  const [ editComment, setEditComment ] = useState(false)

  const commentChangeHandler = (e) => {
    setComment(e.target.value)
  }

  const idHandler = (e) => {
    setId(e.target.id)
  }

  const clearId = () => {
    setId(null)
    setOpen(false)
    setEditComment(false)
  }

  const balanceHandler = (transaction) => {
    if(transaction.type === 'withdrawl'){
      balance -= transaction.amount
    } else if(transaction.type === 'deposit'){
      balance += parseInt(transaction.amount)
    }
    return parseInt(balance).toFixed(2)
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
    .then(data => updateComment(data))
    setOpen(false)
    setComment('')
    setId(null)
    setEditComment(false)
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
    .then(data => updateComment(data))
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
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Comments</Table.HeaderCell>
                    <Table.HeaderCell>Remove</Table.HeaderCell>
                    <Table.HeaderCell>Balance</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
              {transactions.map(transaction =>
                <Table.Row>
                  <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                  {transaction.type === 'withdrawl' ? <Table.Cell className='negative'>-${transaction.amount}</Table.Cell>: <Table.Cell className='positive'>+${transaction.amount}</Table.Cell>}
                  <Table.Cell>{transaction.location}</Table.Cell>
                  <Table.Cell>{transaction.category}</Table.Cell>
                  <Table.Cell>{transaction.type}</Table.Cell>
                  {transaction.comments ? 
                    (<Table.Cell>
                      {transaction.comments}
                      <Modal
                        onClose={() => setEditComment(false)}
                        onOpen={() => setEditComment(true)}
                        open={editComment}
                        trigger={<Button id={transaction.id} color='facebook' onClick={idHandler}>Edit Comment</Button>}
                      >
                        <Modal.Header>Edit Comment</Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                            <TextArea onChange={commentChangeHandler}>{transaction.comments}</TextArea>
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='black' onClick={clearId}>
                            Cancel
                          </Button>
                          <Button
                            labelPosition='right'
                            content='Submit'
                            icon='checkmark'
                            onClick={() => commentSubmitHandler(id)}
                            positive
                          />
                        </Modal.Actions>
                      </Modal>
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

               
                  <Table.Cell>{balanceHandler(transaction)}</Table.Cell>
                </Table.Row>
              )}
              {/* <Table.Row>
              <Table.Header>
                <Table.HeaderCell>Total Deposited</Table.HeaderCell>
                  <Table.Cell>{deposits.length > 0 ? depositTotal.toFixed(2) : 0}</Table.Cell>
                </Table.Header>
              </Table.Row> */}
            </Table.Body>
          </Table>
        :
          <Header textAlign='center' as='h3'>No Transactions for {month}!</Header>
        }
        {/* <Table>
        <Table.Body>
            <Table.Row>
              <Table.Header>
                <Table.HeaderCell>Balance</Table.HeaderCell>
                  {balance > 0 ? <Table.Cell className='positive'>{balance.toFixed(2)}</Table.Cell> : <Table.Cell className='negative'>{balance.toFixed(2)}</Table.Cell>}
                </Table.Header>
              </Table.Row>
            </Table.Body>
        </Table> */}
      </Container>
    </div>
  )
}

export default View
