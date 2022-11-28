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

    function DeleteSkill(id) {

        let data = {id:Number(id)}
        // let jsonData = JSON.stringify(data);
        // console.log(jsonData)
        return new Promise((resolve,reject)=> {
            axiosInstance.delete(`https://projectone.proxolab.com/api/skills`,data).then(res => {
                console.log(res)
                return resolve(res)
            }).catch(ress =>{
                return reject(ress)
            })
        })
        
    }

    return {AddSkill,DeleteSkill}
}