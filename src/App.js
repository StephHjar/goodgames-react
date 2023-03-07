import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import GameCreateForm from "./pages/games/GameCreateForm";
import GamePage from "./pages/games/GamePage";
import PostCreateForm from "./pages/posts/PostCreateForm";
import GamesPage from "./pages/games/GamesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import GameEditForm from "./pages/games/GameEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/games/create" render={() => <GameCreateForm />} />
          <Route exact path="/games/:id" render={() => <GamePage />} />
          <Route exact path="/games/:id/edit" render={() => <GameEditForm />} />
          <Route
            exact
            path="/games"
            render={() => (
              <GamesPage message="No results found. Adjust the search keywords, or add this game to the site!" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <GamesPage message="No results found. Try adding a post yourself!" />
            )}
          />
          <Route
            exact
            path="/posts"
            render={() => (
              // <GamesPage
              //   message="No results found. Try adding a post!"
              //   filter={`owner__profile=${profile_id}&`}
              // />
              <PostCreateForm />
            )}
          />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
