import React, { Fragment } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import PostCardList from "./publicRoute/PostCardList";
import PostDetail from "./publicRoute/PostDetail";
import CategoryResult from "./publicRoute/CategoryResult";
import PostWrite from "./publicRoute/PostWrite";
import Search from "./publicRoute/Search";
import { EditProtectedRoute } from "./protectedRoute/ProtectedRoute";
import PostEdit from "./publicRoute/PostEdit";

function Router() {
  return (
    <Fragment>
      <Nav />
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardList} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route
            path="/post/category/:categoryName"
            exact
            component={CategoryResult}
          />
          <Route path="/search/:searchTerm" exact component={Search} />
          <EditProtectedRoute
            path="/post/:id/edit"
            exact
            component={PostEdit}
          />

          {/* any other weird address except for above, redirect to home */}
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Router;
