import axiosInstance from "../helper/AxiosInstance";

export default function Warrior(){
    function WarriorList() {
        return new Promise((resolve,reject)=> {
            axiosInstance.get(`https://projectone.proxolab.com/api/warriors`).then(res => {
                return resolve(res.data.data)
            })
        })
        
    }

    function WarriorById(id) {
        return new Promise((resolve,reject)=> {
            axiosInstance.get(`https://projectone.proxolab.com/api/warriors/${id}`).then(res => {
                return resolve(res.data.data)
            })
        })
        
    }

    function AddWarrior(data) {
        return new Promise((resolve,reject)=> {
            axiosInstance.post(`https://projectone.proxolab.com/api/warriors`,data).then(res => {
                return resolve(res)
            })
        })
        
    }

    function DeleteWarrior(id) {
        return new Promise((resolve,reject)=> {
            axiosInstance.delete(`https://projectone.proxolab.com/api/warriors`,{ data: { "id": id } }).then(res => {
                return resolve(res)
            })
        })
        
    }

    return {WarriorList,WarriorById,AddWarrior,DeleteWarrior}
}