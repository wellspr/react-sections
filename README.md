# react-sections

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-sections.svg)](https://www.npmjs.com/package/react-sections) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-sections
```

## Usage

```jsx
import React from 'react';

import { 
  Sections,
  Section, 
  Content,
  SideNavbar,
  useListenToScroll
} from 'react-sections';

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
          <h1>First Section</h1>
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

export default SectionsPage;
```

## License

MIT © [wellspr](https://github.com/wellspr)
