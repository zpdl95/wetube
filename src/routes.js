// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:userId";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL =
  "/:videoId"; /* express가 ':id' 값을 변하는 값으로 인지함 */
const EDIT_VIDEO = "/:videoId/edit";
const DELETE_VIDEO = "/:videoId/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:videoId/view";
const ADD_COMMENT = "/:videoId/addComment";
const DELETE_COMMENT = "/:videoId/delComment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (userId) => {
    if (userId) {
      return `/users/${userId}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: (videoId) => {
    if (videoId) {
      return `/videos/${videoId}/delete`;
    }
    return DELETE_VIDEO;
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  faceBook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  me: ME,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  delComment: DELETE_COMMENT,
};

export default routes;
