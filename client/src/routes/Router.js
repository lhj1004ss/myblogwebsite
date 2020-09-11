import React from "react";
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

function Router() {
  return (
    <div>
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

          {/* any other weird address except for above, redirect to home */}
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default Router;
