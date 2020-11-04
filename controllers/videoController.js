import routes from "../routes";
import Video from "../models/Video";

/* async는 무언가를 기다리는 것 */
/* await는 다음 과정이 끝날 때까지 기다려줌 */
/* await는 async함수에서만 사용가능 */
export const home = async (req, res) => {
    try{
        /* .find()를 하면 전부다 가져옴. 따라서 Array형태로 나옴 */
        const videos = await Video.find({});
        res.render("Home", {pageTitle: "Home", videos});
    }catch(error){
        console.log(error);
        res.render("Home", {pageTitle: "Home", videos: []});
    }
}

export const search = (req, res) => {
    // const searchingBy = req.query.term; /* 구 버전 방식 */
    const {query:{term:searchingBy}} = req;
    // {pageTitle: "Search", searchingBy: searchingBy} /* 구버전 방식 */
    res.render("search", {pageTitle: "Search", searchingBy, videos});
}

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"});
}

export const postUpload = async (req, res) => {
    const {body:{title, description}, file: {path}} = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
