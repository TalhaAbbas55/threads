import axios from 'axios';




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



export const getRecipeInfoByUri = async (uri: string) => {
  console.log(`${process.env.NEXT_EDAMAM_URI}&${uri}&app_id=${process.env.NEXT_EDAMAM_APP_ID}&app_key=${process.env.NEXT_EDAMAM_APP_KEY}`)
  try {
    const response = await axios.get(`${process.env.NEXT_EDAMAM_URI}&${uri}&app_id=${process.env.NEXT_EDAMAM_APP_ID}&app_key=${process.env.NEXT_EDAMAM_APP_KEY}`);
    return {
      data: response.data,
      success: true,
    };
  } catch (error:any) {
    return {
      success: false,
      message: error?.response?.data || error?.message,
    };
  }
};


// https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http://www.edamam.com/ontologies/edamam.owl#recipe_c9ed14d96afe9571ed5fbba8b7c883a1&app_id=1c3ae643&app_key=56aef08b5b71f1405ae9cb98866e074a
// https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_c9ed14d96afe9571ed5fbba8b7c883a1&app_id=1c3ae643&app_key=56aef08b5b71f1405ae9cb98866e074a