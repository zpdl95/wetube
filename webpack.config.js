// 이 파일은 server코드와 연관시키지 않는다. 이것은 client code 다
// 이 파일에서는 @babel/node이것을 사용할수 없어서 옛자바스크립트 코드를 사용해야함
// 웹팩은 entry와 output을 가진다
// entry는 어디서 왔는지
// output은 어디로 가는지

/* 파일의 전체 경로를 나타내주는 방법 */
const path = require("path");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};
// export default config; → 이것은 ES6방식
module.exports = config;
