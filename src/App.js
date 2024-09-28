import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Actors from './pages/actors';
import { Container, Navbar, Nav } from 'react-bootstrap';
import EditMovie from './components/edit-movie';
import MovieDetail from './components/movie-details';
import CreateEditActor from './components/create-edit-actor';
import ActorsDetail from './components/actor-details';
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Movie World</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Movies</Nav.Link>
            <Nav.Link as={Link} to="/actors">Actors</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/details/:movieid" element={<MovieDetail></MovieDetail>}></Route>
          <Route path="/edit/:movieid" element={<EditMovie></EditMovie>}></Route>
          <Route path="/actors" element={<Actors></Actors>}></Route>
          <Route path="/actors/create-edit" element={<CreateEditActor></CreateEditActor>}></Route>
          <Route path="/actors/details/:actorid" element={<ActorsDetail></ActorsDetail>}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
