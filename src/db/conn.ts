import mongoose from "mongoose"

require("dotenv").config()
//credencial pelo env
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function main() {
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@soudevcluster.vzzpoqr.mongodb.net/?retryWrites=true&w=majority`
    )
    console.log("conectado ao banco")
  } catch (error) {
    console.log(error)
  }
}

export = main
