const  getDb  = require("../util/database").getDb
const bcrypt = require('bcrypt');


class User {
    constructor(username, email, password){
        this.username = username
        this.email = email
        this.password = password
    }
    async save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    static async findOne(email, password){
        const db = getDb();
        const user = await db.collection('users').findOne({email})
        if(!user){
            return null;
        }
        const compair = await bcrypt.compare(password, user.password)
        if(compair){
            return user;
        }

        return null;
    }
}

module.exports = User;