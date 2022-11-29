import axios from "axios";
import axiosInstance from "../helper/AxiosInstance";

export default function Skill(){
    function AddSkill(data) {
        return new Promise((resolve,reject)=> {
            axiosInstance.post(`https://projectone.proxolab.com/api/skills`,data).then(res => {
                return resolve(res)
            }).catch(ress =>{
                return reject(ress)
            })
        })
        
    }

    function DeleteSkill(ID) {
        return new Promise((resolve,reject)=> {
            axiosInstance.delete(`https://projectone.proxolab.com/api/skills`,{ data: { "id": ID } }).then(res => {
                console.log(res)
                return resolve(res);
            })
        })
        
    }

    return {AddSkill,DeleteSkill}
}