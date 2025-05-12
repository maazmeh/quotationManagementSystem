import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const server = "https://qms.dotnetiks.com/webServices";


export const userLogin = async (email: any, password:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + "/userLogin.php?email=" + email + '&password=' + password;
        let eventData: any = "";
        const url = userLoginApi;
        const headers = {
          "Content-Type": "application/json",
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          }
        );
        if (APIData.data.Status === "failed") {
          reject("failed");
        } else {
          toast.success("Logged In successfully!");
          resolve(APIData);
        }
      } catch (error:any) {
        console.error("Error:", error);
        toast.error("Login failed....", error);
        reject(error);
      }
    });
  };

export const getAllClients = async (companyId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + "/fetchAllClients.php?companyId=" + companyId;
      let eventData: any = "";
      const url = userLoginApi;
      const headers = {
        "Content-Type": "application/json",
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        }
      );
      if (APIData.data.Status === "failed") {
        reject("failed");
      } else {
        resolve(APIData);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
}

export const getAllEmployees = async (companyId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + "/fetchAllEmp.php?companyId=" + companyId;
      let eventData: any = "";
      const url = userLoginApi;
      const headers = {
        "Content-Type": "application/json",
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        }
      );
      if (APIData.data.Status === "failed") {
        reject("failed");
      } else {
        resolve(APIData);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};

export const getAllProducts = async (companyId: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + "/fetchAllProducts.php?companyId=" + companyId;
      let eventData: any = "";
      const url = userLoginApi;
      const headers = {
        "Content-Type": "application/json",
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        }
      );
      if (APIData.data.Status === "failed") {
        reject("failed");
      } else {
        resolve(APIData);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};

export const getAllTaxes = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + "/fetchAllTaxes.php";
      let eventData: any = "";
      const url = userLoginApi;
      const headers = {
        "Content-Type": "application/json",
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        }
      );
      if (APIData.data.Status === "failed") {
        reject("failed");
      } else {
        resolve(APIData);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};


export const fetchProdInfo = (value:any) => {
    return new Promise(async (resolve, reject) => {
        try {
          const userLoginApi = server + "/fetchProductInfo.php?productCode=" + value;
          let eventData: any = "";
          const url = userLoginApi;
          const headers = {
            "Content-Type": "application/json",
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            }
          );
          if (APIData.data.Status === "failed") {
            reject("failed");
          } else {
            resolve(APIData);
          }
        } catch (error) {
          console.error("Error:", error);
          reject(error);
        }
      });
}



export const fetchClientInformation = (value:any) => {
    return new Promise(async (resolve, reject) => {
        try {
          const userLoginApi = server + "/fetchClientInfo.php?name=" + value;
          let eventData: any = "";
          const url = userLoginApi;
          const headers = {
            "Content-Type": "application/json",
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            }
          );
          if (APIData.data.Status === "failed") {
            reject("failed");
          } else {
            resolve(APIData);
          }
        } catch (error) {
          console.error("Error:", error);
          reject(error);
        }
      });
}

export const fetchEmpInformation = (value:any) => {
    return new Promise(async (resolve, reject) => {
        try {
          const userLoginApi = server + "/fetchEmpInfo.php?id=" + value;
          let eventData: any = "";
          const url = userLoginApi;
          const headers = {
            "Content-Type": "application/json",
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            }
          );
          if (APIData.data.Status === "failed") {
            reject("failed");
          } else {
            resolve(APIData);
          }
        } catch (error) {
          console.error("Error:", error);
          reject(error);
        }
      });
}


export const addNewProduct = async (companyId: any, productCode:any, productName:any, description:any, unit:any, unitPrice:any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + "/uploadNewProduct.php?companyId=" + companyId + '&productCode=' + productCode + '&productName=' + productName + '&description=' + description + '&unit=' + unit + '&unitPrice=' + unitPrice;
      let eventData: any = "";
      const url = userLoginApi;
      const headers = {
        "Content-Type": "application/json",
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        }
      );
      if (APIData.data.Status === "failed") {
        reject("failed");
      } else {
        resolve(APIData);
      }
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};