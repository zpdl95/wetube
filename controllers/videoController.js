export const videoHome = (req, res) => res.render("videoHome", {pageTitle: "Home"});
export const videoSearch = (req, res) => res.render("videoSearch", {pageTitle: "Search"});
export const videos = (req, res) => res.render("videos", {pageTitle: "Videos"});
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});