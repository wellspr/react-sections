import React, { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, MemoryRouter } from "react-router-dom";

export const Sections = ({children}) => {
    return (
        <div 
            className="d-flex flex-column justify-content-center align-items-start h-100"
            style={{ position: "relative" }}
            >
            <MemoryRouter>
                { children }
            </MemoryRouter>
        </div>
    );
};

export const Section = (props) => {
    const [headerHeight, setHeaderHeight] = useState("0");
    const [sectionHeight] = useState("100vh");
    const [sectionOpacity, setSectionOpacity] = useState("0");

    useEffect(() => {
      document.querySelector("#header")
      &&
      setHeaderHeight(document.querySelector("#header").clientHeight);
    }, []);
    useEffect(() => setSectionOpacity("1"), [sectionOpacity]);

    const baseClass = "d-flex flex-column justify-content-center align-items-center h-100 p-1";
    const customClass = props.className?` ${props.className}`:"";
    const className = baseClass + customClass;

    const minHeight = () => {
        if (props.fitScreen) {
          if (headerHeight > 0) {
            return `calc(${sectionHeight} - ${headerHeight}px)`;
          }
          return sectionHeight;
        }
        else if (props.fullHeight) {
            return sectionHeight;
        }
    };

    const baseStyle = { 
        minHeight: minHeight(),
        opacity: sectionOpacity,
        transition: "opacity 0.5s ease-in",
    };

    return (
        <section
            id={props.id}
            className={className}
            style={{ ...baseStyle, ...props.style }}
            >
            { props.children }
        </section>
    );
};

export const Content = (props) => {
    const baseClass = "d-flex flex-column justify-content-center align-items-center flex-grow-1 w-100 m-0";
    const customClass = props.className?` ${props.className}`:"";
    const className = baseClass + customClass;

    return (
        <div 
            className={className} 
            style={props.styles}
            >
            { props.children }
        </div>
    );    
};

export const NextSection = (props) => {
    return (
        <div 
            style={{ 
                cursor: "pointer", 
                opacity: 0.65 
            }}
            onClick={() => {
                document.getElementById(props.next).scrollIntoView();
            }}
            >
            <div className="d-flex flex-column justify-content-center align-items-center">
                { props.children } 
                <FaChevronDown color="black" />
            </div>
        </div>
    );
};

export const BackToTop = (props) => {
    const { setListenToScroll, opacity=0.75, display="block" } = props;
    const { children } = props;

    const renderLinkText = () => {
        return <Link 
            to={"/"}  
            className="m-5"
            style={{ opacity, color: "black"}}
            onClick={scrollToTop}
            >
            {children}
        </Link>
    };

    const scrollToTop = () => {
        if (setListenToScroll) {
            setListenToScroll(false);
            setTimeout(() => {
                window.scroll({
                    top: 0,
                    behavior: "smooth"
                });
            }, 100);
            setTimeout(() => {
                setListenToScroll(true);
            }, 200);
        }
        else {
            window.scroll({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    if (children) {
        return renderLinkText()
    }

    return (
        <div 
            className="align-self-center"
            style={{ 
                position: "fixed", 
                bottom: 100, 
            }}>
            <Link
                to="/"
                style={{ 
                    cursor: "pointer", 
                    opacity,
                    transition: "opacity 0.1s ease-in",
                    display
                }}
                onClick={scrollToTop}
                >
                <FaChevronUp color="black" />
            </Link>
        </div>
    );
};

export const SideNavbar = (props) => {
    const [opacity, setOpacity] = useState(0);
    const [display, setDisplay] = useState("none");
    const [leftRef, setLeftRef] = useState(0);
    const [navbarWidth, setNavbarWidth] = useState(null);
    const [activeLink, setActiveLink] = useState("");

    const { setListenToScroll, sideNavbarSections } = props;

    useEffect(() => {
        const update = () => {
            setLeftRef(document.getElementById(props.leftRef).getBoundingClientRect());
            setNavbarWidth(document.getElementById("side-navbar").parentElement.clientWidth*0.30);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [props.leftRef]);

    useEffect(() => {
        const element = (el) => {

            if (document.getElementById(el)) {
                const boundingClientRect = document.getElementById(el).getBoundingClientRect();

                return {
                    top: boundingClientRect.top,
                    height: boundingClientRect.height,
                    bottom: boundingClientRect.bottom
                };
            }
            return null;
        };

        const show = () => {
            const threshold = 100;

            const firstItem = element(sideNavbarSections[0].id);

            if (firstItem) {
                if (firstItem.top <= threshold) { 
                    setOpacity(0.75);
                    setDisplay("block");
                }
                else {
                    setOpacity(0);
                    setDisplay("none");
                }
            }

            sideNavbarSections.map(link => {
                const item = element(link.id);
                if (item) {
                    if (item.top <= threshold && item.bottom > threshold) {
                        setActiveLink(link.id);
                    }
                }
                return null;
            });
        };

        show();
        
        window.addEventListener("scroll", show);

        return () => window.removeEventListener("scroll", show);
    }, [sideNavbarSections]);

    const renderLinks = () => {
        return sideNavbarSections.map(link => {
            return (
                <Nav.Item key={link.id}>
                    <Nav.Link 
                        href={link.href}
                        style={{ color: "black", display }}
                        className={activeLink===link.id?"opacity-100 fw-bold":"opacity-75"}
                        >
                        { link.linkText }
                    </Nav.Link>
                </Nav.Item>
            );
        });
    };

    return (
        <div 
            id="side-navbar"
            className="d-flex flex-column"
            style={{ 
                ...props.style,
                position: "fixed", 
                display,
                top: 50, 
                left: leftRef.right,
                width: navbarWidth,
            }}>
            <div
                className="align-self-center w-100"
                style={{ 
                    cursor: "pointer", 
                    opacity: opacity,
                    transition: "opacity 0.1s ease-in"
                }}
                >
                <Nav className="flex-column justify-content-center align-items-center">
                    { renderLinks() }
                </Nav>
            </div>

            <BackToTop 
                opacity={opacity}
                display={display}
                setListenToScroll={setListenToScroll}
            />
        </div>
    );
};

export const ScrollToSection = (props) => {
    const { 
        children,
        variant,
        size,
        type,
        className,
        sectionID
    } = props;

    const { setListenToScroll } = props;

    const scrollToSection = (id) => {
        if (setListenToScroll) {
            setListenToScroll(false);
            setTimeout(() => {
                document.getElementById(id).scrollIntoView();
            }, 100);
            setTimeout(() => {
                setListenToScroll(true);
            }, 200);
        }
        else {
            document.getElementById(id).scrollIntoView();
        }
    };

    return (
        <Button 
            variant={variant}
            size={size}
            type={type}
            className={className}
            onClick={() => scrollToSection(sectionID)}
            >
            { children }
        </Button>
    );
};

export const useListenToScroll = () => {
    const [listenToScroll, setListenToScroll] = useState(true);

    // Listen for resizes and updates page sections list
    useEffect(() => {
        const updatePageSectionsList = () => {
            const sections = document.querySelectorAll("section");
            let sectionsList = [];
            const pageYOffset = window.scrollY;
  
            Object.values(sections).map((section, index) => {                
                sectionsList.push({ 
                    id: section.id,
                    scrollHeight: section.scrollHeight,
                    rect: section.getBoundingClientRect(),
                    scrollPosition: index * section.scrollHeight
                });
                return null;
            });

            if (listenToScroll) {
                sectionsList.map((section, index) => {
                    if (
                        window.scrollY >= section.scrollPosition
                        &&
                        (   index < sectionsList.length - 1
                            ? 
                            window.scrollY <= sectionsList[index+1].scrollPosition
                            :
                            document.documentElement.scrollHeight
                        )
                    ) 
                    {
                        setTimeout(() => {
                            if (pageYOffset < window.scrollY) {
                                if (index < sectionsList.length - 1) {
                                    window.scrollTo({
                                        top: sectionsList[index+1].scrollPosition
                                    });
                                }
                            }
                            if (pageYOffset > window.scrollY) {
                                window.scrollTo({top: section.scrollPosition});
                            }
                        }, 50);
                    }
                    return null;
                });
            }
        };

        updatePageSectionsList();

        window.addEventListener("resize", updatePageSectionsList);
        window.addEventListener("scroll", updatePageSectionsList);

        return () => {
            window.removeEventListener("resize", updatePageSectionsList);
            window.removeEventListener("scroll", updatePageSectionsList);
        }
    }, [listenToScroll]);

    return { setListenToScroll };
};