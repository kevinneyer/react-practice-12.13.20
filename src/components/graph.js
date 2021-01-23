import React from 'react'
import { categoryOptions } from '../categoryOptions'
import { Chart } from "react-google-charts";
import { FormTextArea } from 'semantic-ui-react';

const Graph = (props) => {
    const { transactions } = props
    // const array = transactions.map(transaction => [transaction.category, parseFloat(transaction.amount)])
    // console.log(array)
    // let array = []
    // const results = []

    // for(let i = 0; i < categoryOptions.length; i++){
    //     array.push(transactions.filter(trans => trans.category === categoryOptions[i].value))
    // }
    // console.log(array)

    // for(let j = 0; j < array.length; j++){
    //     if(!!array[j]){
    //         let quantity = array[j].reduce((a,b) => (a.amount, b.amount), 0)
    //         results.push(array[j].category, quantity)
    //     }
    // }
    // console.log(results)
    return(
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    // ['Eat', 2],
                    // ['Commute', 2],
                    // ['Watch TV', 2],
                    // ['Sleep', 7],
                ]}
                options={{
                    title: 'My Daily Activities',
                    // Just add this option
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
/>
        </div>
    )
}

export default Graph