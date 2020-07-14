const ScheduleModel = require("../../models/schedule");
const mongoose = require("mongoose");

const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

const list = (req, res) => {
    ScheduleModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.render("schedule/list", { result });
    }).sort({ startMeridiem: 1, startTime: 1 });
};

const showCreatePage = (req, res) => {
    res.render("schedule/create");
};

const create = (req, res) => {
    const { title, description, startTime, startMeridiem, endTime, endMeridiem } = req.body;
    if (!title || !description || !startTime || !startMeridiem || !endTime || !endMeridiem) return res.status(400).send("빈 항목이 있습니다.");

    ScheduleModel.create({ title, description, startTime, startMeridiem, endTime, endMeridiem }, (err, result) => {
        if (err) res.status(500).send("등록에 실패했습니다");
        res.status(201).json(result);
    });
};

const showUpdatePage = (req, res) => {
    const id = req.params.id;

    ScheduleModel.findById(id, (err, result) => {
        if (err) return res.status(500).send("조회에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.render("schedule/update", { result });
    });
};

const update = (req, res) => {
    const id = req.params.id;

    const { title, description, startTime, startMeridiem, endTime, endMeridiem } = req.body;

    ScheduleModel.findByIdAndUpdate(id, { title, description, startTime, startMeridiem, endTime, endMeridiem }, { new: true }, (err, result) => {
        if (err) return res.status(500).send("수정에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.json(result);
    });
};

const remove = (req, res) => {
    const id = req.params.id;

    ScheduleModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).send("삭제에 실패했습니다.");
        if (!result) return res.status(404).send("해당 정보가 없습니다.");
        res.json(result);
    });
};

const alarmlist = (req, res) => {
    ScheduleModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.json(result);
    }).sort({ startMeridiem: 1, startTime: 1 });
};

const alarm = (req, res) => {
    const id = req.params.id;

    const { isOn } = req.body;

    ScheduleModel.findByIdAndUpdate(id, { isOn }, { new: true }, (err, result) => {
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
