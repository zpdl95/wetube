import routes from "../routes";
import Video from "../models/Video";

/* async는 무언가를 기다리는 것 */
/* await는 다음 과정이 끝날 때까지 기다려줌 */
/* await는 async함수에서만 사용가능 */
export const home = async (req, res) => {
  try {
    /* .find()를 하면 전부다 가져옴. 따라서 Array형태로 나옴 */
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  // const searchingBy = req.query.term; /* 구 버전 방식 */
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    /* $regex는 regular expression의 약자로 정규표현식을 사용하는 것이다. */
    /* 정규표현식을 사용해서 검색한 단어가 포함된 타이틀을 가져오는 것 */
    /* 옵션에 i는 insensitive 덜 민감하다는걸 의미함. 대소문자 구분 X */
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  // {pageTitle: "Search", searchingBy: searchingBy} /* 구버전 방식 */
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  /* params는 routes에서 주소를 :id 라고 만들어 놨기 때문에 파라미터라고 인지함 */
  const {
    params: { id },
  } = req;
  /* findById()는 인자로 id를 받고 query를 돌려준다 _id */
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${Video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
