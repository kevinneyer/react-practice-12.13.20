import React from 'react'
import { useState, useEffect } from 'react'
import View from './view'
import AddTransaction from './addTrancation'
import Search from './search'
import { Header, Radio } from 'semantic-ui-react'

const Transactions = () => {

    const [ transactions, setTransactions ] = useState([])
    const [ viewBy, setViewBy ] = useState('None')
    const [ search, setSearch ] = useState('')

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

    const viewByHandler = (e) => {
        setViewBy(e.target.innerText)
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }
   
    let spreadTrans = [...transactions]
    spreadTrans = spreadTrans.filter(trans => trans.location.toLowerCase().includes(search.toLowerCase()))

    if(viewBy === 'Date'){
        spreadTrans.sort((a,b) => a.date - b.date)
    } else if
      (viewBy === 'Amount'){
          spreadTrans.sort((a,b) => a.amount - b.amount)
      }

    console.log(search)
    return(
        <div>
            <Header as='h1' textAlign='center'>Transaction Ledger</Header>
            <div>
                <Header as='h5' textAlign='center'>View By</Header>
                <div className='radio'>
                    <Radio onClick={viewByHandler} name='radioGroup' label='None' value='none' checked={viewBy === 'None'}/>
                    {/* <Radio onClick={viewByHandler} name='radioGroup' label='Date' value='date' checked={viewBy === 'Date'} /> */}
                    <Radio onClick={viewByHandler} name='radioGroup' label='Amount' value='amount' checked={viewBy === 'Amount'}/>
                </div>
            </div>
            <Search 
            searchHandler={searchHandler} 
            search={search}
            />
            <AddTransaction addTransaction={addTransaction} />
            <View 
            transactions={spreadTrans} 
            deleteHandler={deleteHandler}
            />
        </div>
    )
}

export default Transactions