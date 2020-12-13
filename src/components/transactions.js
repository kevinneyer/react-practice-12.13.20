import React from 'react'
import { useState, useEffect } from 'react'
import View from './view'
import { Header } from 'semantic-ui-react'
import AddTransaction from './addTrancation'

const Transactions = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
        .then(res => res.json())
        .then(transactions => {
            setTransactions(transactions)
        })
    }, [])
  
    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction])
    }
    return(
        <div>
            <Header as='h1' textAlign='center'>Transaction Ledger</Header>
            <AddTransaction addTransaction={addTransaction}/>
            <View transactions={transactions}/>
        </div>
    )
}

export default Transactions