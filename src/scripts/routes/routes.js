import LandingPage from "../pages/landing_page/landing-page";
import EncodingPage from "../pages/diabetes_user_page/diabetes-user-page";
import DecodingPage from "../pages/diabetest_form_page/diabetes-user-form-page";

const createPublicRoute = (PageClass) => {
  return {
    page: new PageClass(),
    check: () => true,
  };
};

const routes = {
  "/": createPublicRoute(LandingPage),
  "/encoding": createPublicRoute(EncodingPage),
  "/decoding": createPublicRoute(DecodingPage),
};

export default routes;
