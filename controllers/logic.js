const users = require("../models/collections")
const jwt=require('jsonwebtoken')

// register-account creation
register = (req, res) => {

    // acno=req.body.acno
    // const {acno}=req.body

    // psw=req.body.psw
    // const {psw}=req.body

    // unamw=req.body.uname
    // const {uname}=req.body


    // we can make above code short by "de-structuring"
    const { acno, psw, uname } = req.body

    // check user in data collection
    users.findOne({ acno }).then(user => {
        if (user) {
            // res.send("user already Exist")
            res.status(400).json({
                message: "User Already Exist",
                status: false,
                statusCode: 400
            })
        } else {
            // create an object for user
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            // to save in database
            newUser.save()
            // res.send("Account Created Successfully")
            res.status(201).json({
                message: "Account Created Successfully",
                status: true,
                statusCode: 201
            })
        }
    })


}

// ========================================================


// Login
login = (req, res) => {
    // to access data from body
    const { acno, psw } = req.body

    users.findOne({ acno, psw }).then(user => {
        if (user) {
            // Token generation
            const token=jwt.sign({acno},"secretkey123")

            res.status(200).json({
                message: "Login Success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        }
        else {
            res.status(404).json({
                message: "Incorrect UserNmae Or Password",
                status: false,
                statusCode: 404
            })

        }
    })
}
// ========================================================


// balance check
getBalance = (req, res) => {
    // to access acno
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200,
            })
        }
        else {
            res.status(404).json({
                message: "User Not Present",
                status: false,
                statusCode: 404
            })
        }

    })
}

// ========================================================

// Money Transfer
moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, spsw, date } = req.body

    // convert smount to int
    var amnt = parseInt(amount)

    // check Sender Details
    users.findOne({ acno: sAcno, psw: spsw }).then(suser => {
        if (suser) {
            // Check credentials in db
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    // check amount in senders account
                    if (amnt <= suser.balance) {

                        // to update sender
                        suser.balance = suser.balance - amnt
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        suser.save()

                        // to update receiver
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        // status
                        res.status(200).json({
                            message: "Transaction Successfull",
                            status: true,
                            statusCode: 200

                        })


                    }
                    else {
                        res.status(406).json({
                            message: "Insufficient Balance",
                            status: false,
                            statusCode: 406

                        })
                    }


                } else {
                    res.status(404).json({
                        message: "Inavlid credit Credentials",
                        status: false,
                        statusCode: 404

                    })
                }

            })
        }
        else {
            res.status(404).json({
                message: "Inavlid Debit Credentials",
                status: false,
                statusCode: 404

            })
        }
    })

}

// Account statement

accountStatement=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200,
            })
           
        }
        else{
            res.status(404).json({
                message: "User Not Present",
                status: false,
                statusCode: 404
            })
        }
    })
}


// acountdelete
accountDelete=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message: "Account Deleted Successfully",
                status: true,
                statusCode: 200,
            })
        }
        
    })
}


module.exports = { register, login, getBalance, moneyTransfer,accountStatement,accountDelete}



