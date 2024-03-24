import axios from 'axios';


export const postApiWithoutAuth = async (url, body) => {
  try {
    const response = await baseInstance.post(url, body);
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data || error?.error,
    };
  }
};

export const postApiWithAuth = async (url, body) => {
  try {
    
    const response = await baseInstance.post(url, body);
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data || error?.error,
    };
  }
};



export const getApiWithoutAuth = async (url:string,start:number=1,end:number=99) => {
  try {
    
    const response = await axios.get(`${process.env.NEXT_EMAMAM_URL}${url}&&app_id=${process.env.NEXT_EDAMAM_APP_ID}&app_key=${process.env.NEXT_EDAMAM_APP_KEY}&from=${start}&to=${end}`);
    
    return {
      data: response.data,
      success: true,
    };
  } catch (error:any) {
    return {
      success: false,
      message: error?.response?.data || error?.error,
    };
  }
};
