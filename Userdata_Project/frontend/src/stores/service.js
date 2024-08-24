import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = 'http://localhost:8000'

export const useServiceStore = defineStore('service',{
  state:()=>({
    userData:[],
    message:{},
    role:'',
    token:''
  }),
  actions:{
    async registerService(registerBody){
      const bodyData = {
        username: registerBody.username,
        password: registerBody.password
      }
      try {
          const response = await axios.post(`${BASE_URL}/register`,bodyData)
          this.message = response.data
          alert(this.message.message)
      } catch (error) {
        console.log('error',error);
      }
    },

    async loginService(loginBody){
      const bodyData = {
        username: loginBody.username,
        password: loginBody.password
      }
      try {

        const response = await axios.post(`${BASE_URL}/login`,bodyData)
        this.role = response.data.role

        localStorage.setItem('token', response.data.token )
        this.token = response.data.token

      } catch (error) {
        console.log('error',error);
      }
    },
    async getAllUser(){
      try {
        const response = await axios.get(`${BASE_URL}/loadAll`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.userData = response.data.userData
        console.log(this.userData)
      } catch (error) {
        console.log('error',error);
      }
    },
    async getSelf(){
      try {
        const response = await axios.get(`${BASE_URL}/loadSelf`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        this.userData = response.data.userData
        console.log(this.userData)
      } catch (error) {
        console.log('error',error);
      }
    }



  }

})
