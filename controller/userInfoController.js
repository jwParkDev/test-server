const userInfo = require('../data/data');

const userInfoController = {
  // 로그인 시 아이디 및 비밀번호 확인과 회원가입 시 아이디 중복 확인을 하나의 controller로 해결(using params)
  verificationUser: (req, res) => {
    const { condition } = req.params;
    const { username, password } = req.query;
    const targetUser = userInfo.filter((el) => el.username === username)[0];

    if (condition === "loginCondition") {
      if (targetUser) {
        if (targetUser.password === password) {
          res.status(200).json(targetUser);
        } else {
          res.status(400).json({message: 'wrong password'});
        }
      } else {
        res.status(404).json({message: 'user not found'});
      }
    } else if (condition === 'duplicateCheckCondition') {
      if (targetUser) {
        res.status(400).json({message: 'unavailable usename'})
      } else {
        res.status(200).json({message: 'available username'})
      }
    }
  },

  // user를 생성할 때 사용되는 controller
  createUser: (req, res) => {
    const { username, password, dateOfBirth, gender, email, phone, introduction } = req.body;
    userInfo.forEach(el => {
      if (el.username === username) {
        res.status(400).json({message: 'unavailable usename'});
      } else if (el.email === email) {
        res.status(400).json({message: 'unavailable email'});
      } else if (el.phone === phone) {
        res.status(400).json({message: 'unavailable phone'});
      }
    })
    userInfo.push({
      uuid: userInfo.length+1,
      username,
      password,
      dateOfBirth,
      gender,
      email,
      phone,
      introduction
    })
    res.status(201).json({message: 'user creation success'});
  },

  // 유저 아이디로 유저에 대한 정보를 받을 수 있는 controller
  findUserInfoById: (req, res) => {
    const { username } = req.params;
    const targetUser = userInfo.filter(el => el.username === username)[0];
    if (targetUser) {
      res.status(200).json(targetUser);
    } else {
      res.status(404).json({message: 'user not found'});
    }
  },

  // 마이페이지에서 정보를 수정할 때 사용되는 controller
  updateUserInfoById: (req, res) => {
    const { username } = req.params;
    const bodyData = req.body;
    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].username === username) {
        userInfo[i] = {...userInfo[i], ...bodyData};
        res.status(205).json({...userInfo[i]});
      }
    }
  },
};

module.exports = userInfoController;