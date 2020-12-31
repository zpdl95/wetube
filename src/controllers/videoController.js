import fs from "fs";
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

/* async는 무언가를 기다리는 것 */
/* await는 다음 과정이 끝날 때까지 기다려줌 */
/* await는 async함수에서만 사용가능 */
export const home = async (req, res) => {
  try {
    /* .find()를 하면 전부다 가져옴. 따라서 Array형태로 나옴 */
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
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
  if (process.env.PRODUCTION) {
    const {
      body: { title, description },
      /* multer가 주는 주소 */
      file: { location },
      user,
    } = req;
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: user.id,
    });
    user.videos.push(newVideo.id);
    user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } else {
    const {
      body: { title, description },
      /* multer가 주는 주소 */
      file: { path },
      user,
    } = req;
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
      creator: user.id,
    });
    user.videos.push(newVideo.id);
    user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  }
};

export const videoDetail = async (req, res) => {
  /* params는 routes에서 주소를 :videoId 라고 만들어 놨기 때문에 파라미터라고 인지함 */
  const {
    params: { videoId },
  } = req;
  /* findById()는 인자로 id를 받고 query를 돌려준다 _id */
  try {
    /* populate()는 mongoose.Schema.Types.ObjectId에만 사용가능, 객체를 데려오는 함수 */
    /* creator가 id값으로만 나오는데 populate()를 사용해서 내용물까지 가져옴 */
    const video = await Video.findById(videoId)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    req.flash("error", "Video not found");
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { videoId },
    user,
  } = req;
  try {
    const video = await Video.findById(videoId);
    /* 로그인된 유저인지를 확인 */
    /* video.creator는 id만 있음 기본적으로 */
    if (String(video.creator) !== user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${Video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { videoId },
    body: { title, description },
  } = req;
  try {
    /* findOneAndUpdate(_,__) 첫번째 인자는 지정할 대상, 두번째 인자는 변경할 값 */
    await Video.findOneAndUpdate({ _id: videoId }, { title, description });
    res.redirect(routes.videoDetail(videoId));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { videoId },
    user,
  } = req;
  try {
    /* 로그인된 유저인지를 확인 */
    const video = await Video.findById(videoId);
    if (String(video.creator) !== user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: videoId });
      user.videos = await user.videos.filter(
        (videoid) => String(videoid) !== videoId
      );
      user.save();
      /* 파일 삭제 명령어 */
      const fileName = video.fileUrl.split("/").pop();
      const params = {
        Bucket: "tweetube1",
        Key: `video/${fileName}`,
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// API 서버하고 소통하는 코드, database로 다른 서비스와 통신하기 위해 만들어짐
export const postRegisterView = async (req, res) => {
  const {
    params: { videoId },
  } = req;
  try {
    const video = await Video.findById(videoId);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { videoId },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(videoId);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    user.comments.push(newComment.id);
    user.save();
    res.send(newComment.id);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDelComment = async (req, res) => {
  const {
    params: { videoId },
    body: { commentId },
    user,
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (String(comment.creator) !== user.id) {
      throw Error();
    } else {
      await Comment.findOneAndRemove({ _id: commentId });
      const video = await Video.findById(videoId);
      video.comments = await video.comments.filter(
        (commentid) => String(commentid) !== commentId
      );
      video.save();
      user.videos = await user.comments.filter(
        (commentid) => String(commentid) !== commentId
      );
      user.save();
    }
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
