import React from 'react'
import { Header, Input } from 'semantic-ui-react'

const Search = (props) => {

    const { searchHandler, search } = props
    return(
        <div className='search'>
            <Header as='h3'>Search Transactions</Header>
            <Input onChange={searchHandler} value={search} icon='search' placeholder='Search by location...' />
        </div>
    )
}

export default Search