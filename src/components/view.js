import React from 'react'

const View = (props) => {

    const{ transactions } = props

    return(
        <div>
            {
                transactions.map(transaction => 
                   <>{transaction.amount}</>
                )
            }
        </div>
    )
}

export default View