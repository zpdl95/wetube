// 이 파일은 server코드와 연관시키지 않는다. 이것은 client code 다
// 이 파일에서는 @babel/node이것을 사용할수 없어서 옛자바스크립트 코드를 사용해야함
// 웹팩은 entry와 output을 가진다
// entry는 어디서 왔는지
// output은 어디로 가는지

/* 파일의 전체 경로를 나타내주는 방법 */
const path = require("path");
const autoprefixer = require("autoprefixer");
/* webpack의 버전업으로 인해 extract-text-webpack-plugin는 사용못함 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/* webpack의 모드를 설정 production은 서버에 코드를 올리는 모드, development는 ... */
const MODE = process.env.WEBPACK_ENV;
/* path.resolve 는 이전경로는 무시하고 맨 마지막 경로만 출력 ex) path.resolve('/a', '/b') // Outputs '/b' */
/* 또한 path.resolve 는 항상 절대url 을 생성 그리고 이것을 만들기 위해 현재의 위치를 기본으로 사용 */
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
/* path.join 은 이전 인수까지 전부 출력 ex) path.join('/a', '/b') // Outputs '/a/b' */
/* __dirname는 파일의 절대경로 */
const OUTPUT_DIR = path.join(__dirname, "static");
/* webpack은 config를 아래에서 위로 실행한다 */
const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  /* webpack이 module을 만날때 마다 해당 rules를 따르라고 한다 */
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        /* test는 해당 파일을 찾으라는 것. 정규식 사용해야함. 확장자가 .scss인것을 찾아라 */
        /* 정규식은 /\로 시작. $/로 끝 */
        test: /\.(scss)$/,
        /* 받은 css를 EXtractCSS.extract로 추출함 */
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            /* ↓ 이 loader은 webpack이 css를 이해할 수 있도록 함 */
            /* scss가 css가 되고 브라우저와 호환까지된 css를 받음 */
            loader: "css-loader",
          },
          {
            /* css를 해당 웹브라우저와 호환되게 해줌 */
            /* 특정 plugin들을 css에 대해 실행시킴 */
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                },
              },
            },
          },
          {
            /* ↓ 이 loader은 webpack이 scss를 이해할 수 있도록 함 */
            /* scss를 받아서 css로 변환 */
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  /* import로 가져온 plugin 설치 */
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
};
// export default config; → 이것은 ES6방식
module.exports = config;

/* 구버전 방식
const ExtractCSS = require("extract-text-webpack-plugin");

use: ExtractCSS.extract([
{
  loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
}
])
plugins: [new ExtractCSS("styles.css")],
*/
