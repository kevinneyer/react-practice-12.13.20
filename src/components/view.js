import React from 'react'
import { Table, Button, Container } from 'semantic-ui-react'

const View = (props) => {

    const{ transactions, deleteHandler } = props

    return(
        <div>
          <Container fluid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transactions.map(transaction =>
                        <Table.Row>
                            <Table.Cell>{transaction.date}</Table.Cell>
                            <Table.Cell>{transaction.amount}</Table.Cell>
                            <Table.Cell>{transaction.location}</Table.Cell>
                            <Table.Cell>{transaction.category}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button id={transaction.id} onClick={() => deleteHandler(transaction.id)} color='red'>Remove</Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
          </Container>
        </div>
    )
}

export default View
