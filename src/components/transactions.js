import React from 'react'
import { useState, useEffect } from 'react'
import View from './view'

const Transactions = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
        .then(res => res.json())
        .then(transactions => {
            setTransactions(transactions)
        })
    }, [])
  
    return(
        <div>
            <View transactions={transactions}/>
        </div>
    )
}

export default Transactions