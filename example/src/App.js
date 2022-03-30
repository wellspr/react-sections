import "./index.css";
import React from 'react';

import { 
  Sections,
  Section, 
  Content,
  SideNavbar,
  useListenToScroll
} from 'react-sections';

import { Container, Navbar } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

const SectionsPage = () => {

  const sideNavbarSections = [
    {
      id: "second_section",
      href: "#second_section",
      linkText: "Second Section",
    },
    {
      id: "third_section",
      href: "#third_section",
      linkText: "Third Section",
    }
  ];

  const { setListenToScroll } = useListenToScroll();

  return (
    <Sections>
      <Section
        id="first_section"
        fitScreen={true}
        className="w-100"
        >
        <Content>
          <h1>React Sections</h1>

          <h2>A smart scrolling between sections.</h2>
        </Content>
      </Section>

      <Section
        id="second_section"
        fullHeight={true}
        style={{ width: "70%" }}
        >
        <Content>
          <h2>Second Section</h2>
        </Content>
      </Section>

      <Section
        id="third_section"
        fullHeight={true}
        style={{ width: "70%" }}
        >
        <Content>
          <h2>Third Section</h2>
        </Content>
      </Section>

      <SideNavbar 
          leftRef="second_section"
          setListenToScroll={setListenToScroll}
          sideNavbarSections={sideNavbarSections}
      />

    </Sections>
  );
};

const Menu = () => {
  return null;
};

const appBrandName = () => "React Sections";

const year = new Date().getFullYear();

const App = () => {
  return <div className="d-flex flex-column vh-100">
    <header id="header">
      <Navbar bg="dark" variant="dark" expand="sm">
          <Container>
              <Navbar.Brand href="/">{ appBrandName() }</Navbar.Brand>
              <Navbar.Toggle aria-controls="app-navbar-nav" />
              <Navbar.Collapse id="app-navbar-nav" >
                  <Menu />
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
    <main className="d-flex flex-column flex-grow-1">
        <Container className="d-flex flex-column flex-grow-1 mt-0">
          <SectionsPage />
        </Container>
    </main>
    <footer>
      <div className="d-flex justify-content-center align-items-center">
        <span 
          className="text-muted me-5"
          style={{ fontSize: "0.75rem" }}
          >
          &copy; { year } React Sections
        </span>
        <a href="https://github.com/wellspr/react-sections"><span style={{ color: "black" }}><FaGithub /></span></a>
      </div>
    </footer>
  </div>
};

export default App;
