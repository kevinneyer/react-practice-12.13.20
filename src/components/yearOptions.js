export const yearOptions = [
]

let date = new Date().getFullYear()

for(let i = 2018; i <= date; i++){
    yearOptions.push({ key: i, value: i, text: i })
}