import { defineStore } from "pinia";

export const useEmployeeStore = defineStore('employee',{
    state:()=>({
        employeeList:[
            {
                name:'em1',
                idNumber:'1111111111111',
                contact:'1111111111',
                role:'admin',
                imgUrl:'https://fastly.picsum.photos/id/58/200/200.jpg?hmac=aol3E3KC2fpsVXlPhgxLR9-CLoUQa-kbswhZx-gYzCE',
                fullname:'123456'
            },
            {
                name:'em2',
                idNumber:'2222222222222',
                contact:'222222222',
                role:'chef',
                imgUrl:'https://fastly.picsum.photos/id/786/200/200.jpg?hmac=3dBXR8Wgti8p-uOxlCjB5NiYqcQN2no2NkKDu-J92YA',
                fullname:'789456'
            },
            {
                name:'em3',
                idNumber:'3333333333333',
                contact:'3333333333',
                role:'chashiar',
                imgUrl:'https://fastly.picsum.photos/id/811/200/200.jpg?hmac=aHZzO_yldxODDwFs6yO7fk8Mr1uZ7Mx2J-Ek188-rT4',
                fullname:'456789'
            },
            
            
        ],
        employeeDetail:{
            name:'',
            idNumber:'',
            contact:'',
            role:'',
            imgUrl:'',
            fullname:''
        },
        
        employeeImgDefault: 'https://fastly.picsum.photos/id/214/200/200.jpg?hmac=hcznBngs7e7PmNwXcM4UioAhb1oOUpfGDzBM-qSgpp4',

        roleList:[
            'admin',
            'chef',
            'chashiar',
        ]

    }),
    getters:{
        filterEmployeeRole:(state) => (role) => {
            return state.employeeList.filter(item => item.role === role)
        },
        getindexByName:(state) => (name) =>{
            return state.employeeList.findIndex(item => item.name === name)
        }
    },
    actions:{
        setEmployee(){
            localStorage.setItem('employee-data', JSON.stringify(this.employeeList))
        },
        loadEmployee(){
            const getData = localStorage.getItem('employee-data')
            if(getData){
                this.employeeList = JSON.parse(getData)
                localStorage.setItem('employee-data',JSON.stringify(this.employeeList))
            }
        },
        registerEmployee(employeeData){
            this.employeeList.push(employeeData)
            localStorage.setItem('employee-data',JSON.stringify(this.employeeList))
        },
        editEmployeeData(name, data){
            this.employeeList[this.getindexByName(name)] = data
            localStorage.setItem('employee-data',JSON.stringify(this.employeeList))
        },
        changeRole(name, newRole){
            this.employeeList[this.getindexByName(name)].role = newRole
            localStorage.setItem('employee-data',JSON.stringify(this.employeeList))
        },
        removeEmployee(name){
            if(this.getindexByName(name) > -1){
                this.employeeList.splice(this.getindexByName(name), 1)
            }
            localStorage.setItem('employee-data',JSON.stringify(this.employeeList))
        }
    }
})

/*
mockup employee
{
    name:'em1',
    idNumber:'1111111111111',
    contact:'1111111111',
    role:'admin',
},
{
    name:'em2',
    idNumber:'2222222222222',
    contact:'222222222',
    role:'chef',
},
{
    name:'em3',
    idNumber:'3333333333333',
    contact:'3333333333',
    role:'chashiar',
},
*/ 