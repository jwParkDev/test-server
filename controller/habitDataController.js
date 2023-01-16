const habitData = require("../data/data");

const habitDataController = {
  // user를 생성할 때 사용되는 controller
  getHabitData: (req, res) => {
    const page = +req.params.page;
    const startIdx = 30 * page;
    const endIdx = 30 * (page + 1);
    const pageData = habitData.slice(startIdx, endIdx);
    console.log(page);
    res.status(200).json(pageData);
  },
};

module.exports = habitDataController;
