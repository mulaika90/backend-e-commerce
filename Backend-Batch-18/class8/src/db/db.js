import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1','8.8.8.8'])

import mongoose from "mongoose"
main().catch(err => console.log(err));

async function main() {
  try{
      await mongoose.connect('mongodb+srv://mulaikasalman456_db_user:90kbhOUphzgGprxc@cluster0.2ytbjmz.mongodb.net/');

  console.log("Connected to DB");
  }catch(err){
    console.log("Error connecting to DB", err);
  }
}
export default main