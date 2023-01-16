const categorydata = require("../data/categoryData");

const categoryDataController = {
  // user를 생성할 때 사용되는 controller
  getCategoryData: (req, res) => {
    console.log(req.params);
    const categoryId = req.params.categoryId;
    const page = +req.params.page;
    const startIdx = 30 * page;
    const endIdx = 30 * (page + 1);
    const pageData = categorydata
      .filter((el) => el.categoryId === Number(categoryId))
      .slice(startIdx, endIdx);
    console.log(pageData);
    console.log(page);
    res.status(200).json(pageData);
  },
};

module.exports = categoryDataController;
