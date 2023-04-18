import mongoose from "mongoose"

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mmorpg")
    console.log("conectado ao banco")
  } catch (error) {
    console.log(error)
  }
}

export = main
