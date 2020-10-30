import routes from "./routes";

export const localsMiddlewares = (req, res, next) =>{
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();
};