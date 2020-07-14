const AlarmModel = require("../../models/alarm");
const mongoose = require("mongoose");

const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

const list = (req, res) => {
    AlarmModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.render("alarm/list", { result });
    }).sort({ time: 1 });
};

const showCreatePage = (req, res) => {
    res.render("alarm/create");
};

const create = (req, res) => {
    const { title, description, time, meridiem } = req.body;
    if (!title || !description || !time || !meridiem) return res.status(400).send("빈 항목이 있습니다.");

    AlarmModel.create({ title, description, time, meridiem }, (err, result) => {
        if (err) res.status(500).send("등록에 실패했습니다");
        res.status(201).json(result);
    });
};

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    AlarmModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회에 실패했습니다");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.render("alarm/update", { result });
    });
};

const update = (req, res) => {
    const id = req.params.id;

    const { title, description, time, meridiem } = req.body;

    AlarmModel.findByIdAndUpdate(id, { title, description, time, meridiem }, { new: true }, (err, result) => {
        if (err) return res.status(500).send("수정에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.json(result);
    });
};

const remove = (req, res) => {
    const id = req.params.id;

    AlarmModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).send("삭제에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.json(result);
    });
};

const alarmlist = (req, res) => {
    AlarmModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.json(result);
    }).sort({ time: 1 });
};

const alarm = (req, res) => {
    const id = req.params.id;

    const { isOn } = req.body;

    AlarmModel.findByIdAndUpdate(id, { isOn }, { new: true }, (err, result) => {
        if (err) return res.status(500).send("수정에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.json(result);
    });
};

module.exports = {
    checkId,
    list,
    showCreatePage,
    create,
    showUpdatePage,
    update,
    remove,
    alarmlist,
    alarm,
};
