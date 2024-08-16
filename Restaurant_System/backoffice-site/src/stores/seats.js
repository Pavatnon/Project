import { defineStore } from "pinia";

export const useSeatStore = defineStore('seat-table', {
    state:()=>({
        tableList:[
            {
                tableNumber:'1',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'2',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'3',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'4',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'5',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'6',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'7',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'8',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'9',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'10',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
        ],
        statusList:[
            'ว่าง',
            'ไม่ว่าง',
            'ติดจอง'
        ],

        tableByNumber:{
            tableNumber:'',
            seatsCount:'',
            tableStatus:''
        }
    }),
    getters:{
        enableTable(state){
            return state.tableList.filter(item => item.tableStatus === this.statusList[0])
        },
        unableTable(state){
            return state.tableList.filter(item => item.tableStatus !== this.statusList[0])
        },
        bookTable(state){
            return state.tableList.filter(item => item.tableStatus === this.statusList[2])
        },
    },
    actions:{
        setSeat(){
            localStorage.setItem('table-data', JSON.stringify(this.tableList))
        },
        loadSeat(){
            const getTable = localStorage.getItem('table-data')
            if(getTable){
                this.tableList = JSON.parse(getTable)
            }
        },
        addNewSeat(newTabledata){
            this.tableList.push(newTabledata)
            localStorage.setItem('table-data', JSON.stringify(this.tableList))

        },
        getindexByName(name){   
            return this.tableList.findIndex(item => item.tableNumber === name)
        },
        editSeat(name, newTabledata){
            
            this.tableList[this.getindexByName(name)] = newTabledata
            localStorage.setItem('table-data', JSON.stringify(this.tableList))
        },
        changeStatusSeat(name, newStatus){
            this.tableList[this.getindexByName(name)].tableStatus = newStatus
            localStorage.setItem('table-data', JSON.stringify(this.tableList))
        },
        removeSeat(name){
            this.tableList.splice(this.getindexByName(name), 1)
            localStorage.setItem('table-data', JSON.stringify(this.tableList))
        }
    }
})

/*
mockup seat
    {
                tableNumber:'1',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'2',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'3',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'4',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'5',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'6',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'7',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'8',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'9',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
            {
                tableNumber:'10',
                seatsCount:'5',
                tableStatus:'ว่าง'
            },
*/