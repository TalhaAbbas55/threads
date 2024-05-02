import axios from "axios";

import Recipe from "../models/recipe.model";

export const getRequestRecipe = async (url: string) => {
  console.log(url, "here");
  try {
    const response = await axios.get(url);
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data || error?.message,
    };
  }
};

// export async function rateRecipe(uri: string, rating: number) {
//   // connectToDatabase();
//   try {
//     // Find the recipe document based on the URI
//     // let recipe = await Recipe.findOne({ uri });

//     // // If the recipe document does not exist, create a new one
//     // if (!recipe) {
//     //   // Create a new recipe document with the provided URI and rating
//     //   recipe = new Recipe({ uri, rating });
//     // } else {
//     //   // Validate the rating (ensure it's between 1 and 5, for example)
//     //   if (rating < 1 || rating > 5) {
//     //     throw new Error("Rating must be between 1 and 5");
//     //   }

//     //   // Update the rating field of the existing recipe
//     //   recipe.rating = rating;
//     // }

//     // Save the recipe document (whether it's a new record or an existing one)
//     console.log("rating recipe", uri, rating);
//     const recipe = new Recipe({ uri, rating });

//     console.log(recipe);
//     await recipe.save();

//     // Return the updated or newly created recipe document
//     return recipe;
//   } catch (error) {
//     console.error("Error rating recipe:", error);
//     throw new Error("Unable to rate recipe");
//   }
// }
