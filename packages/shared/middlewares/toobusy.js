import toobusy from "toobusy-js";

export default (req, res, next) => {
  if (process.env.NODE_ENV !== "testing" && !process.env.TEST_DB && toobusy()) {
    res.statusCode = 503;
    res.end("Server load is too high.  Please try again in a few minutes.");
  } else {
    next();
  }
};
