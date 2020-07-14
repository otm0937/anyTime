const Usermodel = require("../../models/user");
const { response } = require("express");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { render } = require("../../app");

const showSignupPage = (req, res) => {
    res.render("user/signup");
};

const showLoginPage = (req, res) => {
    res.render("user/login");
};

const signup = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).send("모든 항목을 채워주세요.");
    Usermodel.findOne({ email }, (err, result) => {
        if (err) return res.status(500).send("사용자 조회에 실패했습니다.");
        if (result) return res.status(409).send("이미 사용중인 E-mail입니다.");

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.status(500).send("암호화에 실패했습니다.");

            const user = new Usermodel({ name, email, password: hash });
            user.save((err, result) => {
                if (err) return res.status(500).send("사용자 등록에 실패했습니다.");
                res.status(201).json(result);
            });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("빈 항목이 있습니다.");

    Usermodel.findOne({ email }, (err, user) => {
        if (err) return res.status(500).send("로그인에 실패했습니다.");
        if (!user) return res.status(404).send("없는 계정입니다.");

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send("로그인에 실패했습니다");
            if (!isMatch) return res.status(500).send("비밀번호가 올바르지 않습니다.");

            const token = jwt.sign(user._id.toHexString(), "secretKey");

            Usermodel.findByIdAndUpdate(user._id, { token }, (err, result) => {
                if (err) return res.status(500).send("로그인에 실패했습니다");

                res.cookie("token", token, { httpOnly: true });
                res.json(result);
            });
        });
    });
};

const checkAuth = (req, res, next) => {
    res.locals.user = null;

    const token = req.cookies.token;

    if (!token) {
        if (req.url === "/" || req.url === "/api/user/signup" || req.url === "/api/user/login") return next();
        else return res.render("user/login");
    }

    jwt.verify(token, "secretKey", (err, _id) => {
        if (err) {
            res.clearCookie("token");
            return res.render("user/login");
        }
        Usermodel.findOne({ _id, token }, (err, user) => {
            if (err) return res.status(500).send("인증에 실패했습니다");
            if (!user) return res.render("user/login");
            res.locals.user = { name: user.name, role: user.role };
            next();
        });
    });
};

const logout = (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, "secretKey", (err, _id) => {
        if (err) return res.status(500).send("로그아웃에 실패했습니다");
        Usermodel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
            if (err) return res.status(500).send("로그아웃에 실패했습니다");
            res.clearCookie("token");
            res.redirect("/");
        });
    });
};

module.exports = { showSignupPage, signup, showLoginPage, login, checkAuth, logout };
