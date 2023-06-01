import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8085/employeeportal-service/personalinfo';


class EmployeeService{

    getHeader(){
       
        const token = sessionStorage.getItem("jwtToken");
       return {
                headers:{
                Authorization: 'Bearer ' + token
            }
        }
        
     }

     getEmailId(){
        
        return sessionStorage.getItem("email");
     }

    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee)
    }

    getEmployeeById(employeeId){
        console.log("Get data");
        
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + this.getEmailId(), this.getHeader());
    }

    updateEmployee(employeeId, employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + this.getEmailId(), employee, this.getHeader());
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' +employeeId);
    }
}

export default new EmployeeService();