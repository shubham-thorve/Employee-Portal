import axios from 'axios'

const COMPANY_BASE_REST_API_URL = 'http://localhost:8085/employeeportal-service/companydetails';

class CompanyService{

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

    getAllCompanys(){
        return axios.get(COMPANY_BASE_REST_API_URL)
    }

    createCompany(company){
        return axios.post(COMPANY_BASE_REST_API_URL+ '/' + this.getEmailId(), this.getHeader() )
    }

    getCompanyById(employeeId){
       // console.log(employeeId);
        return axios.get(COMPANY_BASE_REST_API_URL + '/' + this.getEmailId(), this.getHeader());
    }
  
    updateCompany(employeeId, company){
        return axios.put(COMPANY_BASE_REST_API_URL + '/' + this.getEmailId(), company, this.getHeader());
    }

    deleteCompany(employeeId){
        return axios.delete(COMPANY_BASE_REST_API_URL);
    }
}

export default new CompanyService();
