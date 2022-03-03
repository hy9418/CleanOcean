const { resultSuccess } = require("../util");

function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "admin",
      realName: "sssgoEasy Admin",
      avatar: "",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      auths: [],
      modules: [],
      is_admin: 1,
      role_name: "管理员角色",
      mobile: 13000000000,
      last_login: "2021-11-11 12:00"
    }
  ];
}

module.exports = [
  // mock user login
  {
    url: "/v1/user/login",
    type: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        item => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError("Incorrect account or password！");
      }
      return resultSuccess(checkUser);
    }
  }
];
