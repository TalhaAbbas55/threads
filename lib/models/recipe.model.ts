"use server";
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  uri: { type: String, required: true, unique: true },
});

console.log(mongoose.models, "mongoose");
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
