import User from "../models/user.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"


async function RegisterUser(req: Request, res: Response) {
    let { username, email, password, avatar } = req.body;
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}


    try {
        let exist = await User.findOne({ email });
        if (exist) {
            return res.status(200).json({ msg: "User already exists" });
        }
      if(avatar===""){
        avatar="data:image/png;base64,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"
      }
    
        const newUser = new User({ username, email, password,avatar,contactList:[] });
        const payload = { user: newUser };
        await newUser.save();
       jwt.sign(payload , secert,{ expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
         res.status(201).json({ msg: "User registered successfully", user: newUser,token:token });
      }); 
      
    } catch (error:any) {
        console.error(error);
        res.status(500).json({msg:11000})
    
    }
}

async function LoginUser(req: Request, res: Response) {
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}
   
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(400).json({code:1});
        }

        const passwordMatched = await user.matchPasswords(req.body.password);
        if (!passwordMatched) {
            return res.status(400).json({code:2});
        }
        user.password=req.body.password
        const payload = { user: user };
        jwt.sign(payload , secert,{ expiresIn: '1h' }, (err, token) => {
         if (err) throw err;
         res.status(200).json({ msg: 'Login successful',code:3,user:user});
       });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { LoginUser, RegisterUser };
