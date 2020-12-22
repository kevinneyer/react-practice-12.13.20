import React from 'react'
import { useState, useEffect } from 'react'
import View from './view'
import AddTransaction from './addTrancation'
import Search from './search'
import { monthOptions } from './monthOptions'
import { Header, Radio, Dropdown } from 'semantic-ui-react'

const Transactions = () => {

    const [ transactions, setTransactions ] = useState([])
    const [ viewBy, setViewBy ] = useState('None')
    const [ search, setSearch ] = useState('')
    const [ comments, setComments ] = useState([])
    const [ month, setMonth ] = useState('None')

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
        .then(res => res.json())
        .then(transactions => {
            setTransactions(transactions)
        })
        // fetch('http://localhost:3000/comments')
        // .then(res => res.json())
        // .then(comments => {
        //     setComments(comments)
        // })
    }, [])

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction])
    }

    const addComment = (comment) => {
      setComments([...comments, comment])
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

    const monthHandler = (e) => {
        setMonth(e.target.innerText)
    }

    let spreadTrans = [...transactions]

    spreadTrans = spreadTrans.filter(trans => trans.location.toLowerCase().includes(search.toLowerCase()))

    if(viewBy === 'Date'){
        spreadTrans.sort((a,b) => new Date(a.date) - new Date(b.date))
    } else if
      (viewBy === 'Amount'){
          spreadTrans.sort((a,b) => a.amount - b.amount)
    }

    if (month === 'January'){
        spreadTrans = spreadTrans.filter( (trans) => new Date(trans.date).getMonth() === 0)
    }
    else if (month === 'February'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 1)
    }
    else if (month === 'March'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 2)
    }
    else if (month === 'April'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 3)
    }
    else if (month === 'May'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 4)
    }
    else if (month === 'June'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 5)
    }
    else if (month === 'July'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 6)
    }
    else if (month === 'August'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 7)
    }
    else if (month === 'September'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 8)
    }
    else if (month === 'October'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 9)
    }
    else if (month === 'November'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 10)
    }
    else if (month === 'December'){
        spreadTrans = spreadTrans.filter( trans => new Date(trans.date).getMonth() === 11)
    }
   
    return(
        <>
            <Header as='h1' textAlign='center'>Transaction Ledger</Header>
            <div>
                <Header as='h5' textAlign='center'>View By</Header>
                <div className='radio'>
                    <Radio onClick={viewByHandler} name='radioGroup' label='None' value='none' checked={viewBy === 'None'}/>
                    <Radio onClick={viewByHandler} name='radioGroup' label='Date' value='date' checked={viewBy === 'Date'} />
                    <Radio onClick={viewByHandler} name='radioGroup' label='Amount' value='amount' checked={viewBy === 'Amount'}/>
                    <Dropdown 
                    text={month}
                    search
                    selection
                    options={monthOptions}
                    value={month}
                    onChange={monthHandler}
                    />
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
            addComment={addComment}
            month={month}
            />
            {/* <Comments comments={comments}/> */}
        </>
    )
}

export default Transactions
