import routes from "../routes";

export const home = (req, res) => {
    res.render("Home", {pageTitle: "Home", videos})
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

export const postUpload = (req, res) => {
    const {body:{file, title, description}} = req;
    // To Do: video upload and save
    res.redirect(routes.videoDetail(324393));
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
