module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off" /* 콘솔로그 사용가능 */,
    "prettier/prettier": "off" /* 이걸해야 이상한 오류 안생김 */,
    "spaced-comment": "off" /* 지금 사용하는 주석 사용가능 */,
  },
};
