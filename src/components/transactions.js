import React from 'react'
import { useState, useEffect } from 'react'
import View from './view'
import AddTransaction from './addTrancation'
import Filter from './filter'
import { Header, Radio } from 'semantic-ui-react'

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

    const deleteHandler = (id) => {
        fetch(`http://localhost:3000/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
           let updatedTransactions = [...transactions] 
           setTransactions(updatedTransactions.filter(trans => trans.id !== id))
        })
    }

    let spreadTrans = [...transactions]

    return(
        <div>
            <Header as='h1' textAlign='center'>Transaction Ledger</Header>
            <div>
                <Header as='h5' textAlign='center'>View By</Header>
                <div className='radio'>
                    <Radio label='None' value='none' />
                    <Radio label='Date' value='date' />
                    <Radio label='Amount' value='amount' />
                </div>
            </div>
            <AddTransaction addTransaction={addTransaction} />
            <View 
            transactions={spreadTrans} 
            deleteHandler={deleteHandler}
            />
        </div>
    )
}

export default Transactions