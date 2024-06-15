var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import generateServerMessage from "../IntilaIDataGenreation/generateData.js";
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, email, password, avatar } = req.body;
        const secert = process.env.JWT_SECRET || "";
        if (secert === "") {
            console.log("ERROR: secert is undefiends,please check your jwt scecert ");
            return res.send(403);
        }
        try {
            let exist = yield User.findOne({ email });
            if (exist) {
                return res.status(200).json({ msg: "User already exists" });
            }
            if (avatar === "") {
                avatar = "data:image/png;base64,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";
            }
            console.log(password);
            const newUser = new User({ username, email, password, avatar, contactList: [] });
            console.log(password);
            const payload = { email: email, password: password };
            yield newUser.save();
            jwt.sign(payload, secert, { expiresIn: '1h' }, (err, token) => {
                if (err)
                    throw err;
                res.status(201).json({ msg: "User registered successfully", user: newUser, token: token });
            });
            generateServerMessage(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: 11000 });
        }
    });
}
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secert = process.env.JWT_SECRET || "";
        if (secert === "") {
            console.log("ERROR: secert is undefiends,please check your jwt scecert ");
            return res.send(403);
        }
        try {
            const user = yield User.findOne({ email: req.body.userData.email });
            if (!user) {
                return res.status(400).json({ code: 1 });
            }
            const passwordMatched = yield user.matchPasswords(req.body.userData.password);
            if (!passwordMatched) {
                return res.status(400).json({ code: 2 });
            }
            if (req.body.tokenAuthenticated) {
                res.status(200).json({ msg: 'Login successful', code: 4, user: user });
            }
            else {
                const payload = { email: req.body.userData.email, password: req.body.userData.password };
                jwt.sign(payload, secert, { expiresIn: '1h' }, (err, token) => {
                    if (err)
                        throw err;
                    res.status(200).json({ msg: 'Login successful', code: 3, user: user, token: token });
                });
            }
        }
        catch (error) {
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export { LoginUser, RegisterUser };
