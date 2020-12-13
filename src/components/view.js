import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const View = (props) => {

    const{ transactions } = props

    return(
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Location</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transactions.map(transaction => 
                        <Table.Row>
                            <Table.Cell>{transaction.date}</Table.Cell>
                            <Table.Cell>{transaction.amount}</Table.Cell>
                            <Table.Cell>{transaction.location}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button id={transaction.id} color='red'>Remove</Button>
                            </Table.Cell>
                        </Table.Row>
                    )}   
                </Table.Body>
            </Table>
        </div>
    )
}

export default View