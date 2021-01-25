import React from 'react'
import { categoryOptions } from '../categoryOptions'
import { Chart } from "react-google-charts";

const Graph = (props) => {
    
    const { transactions } = props

    let array = []
    let results = []

    for(let i = 0; i < categoryOptions.length; i++){
        array.push(transactions.filter(trans => trans.category === categoryOptions[i].value))
    }

    for(let j = 0; j < array.length; j++){
        if(array[j].length > 0){
            let total = 0
            array[j].forEach(arr => total += parseFloat(arr.amount))
            results.push([array[j][0].category, total])
        }
    }

    results.unshift(['Category', 'Amount'])

    return(
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={ results }
                options={{
                    title: 'My Spending per Category',
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}  
            />
        </div>
    )
}

export default Graph