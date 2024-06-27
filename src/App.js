import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CodeEditor from './CodeEditor';
import { lightTheme, darkTheme, systemTheme } from './themes';
import { languages } from './Language';
import './App.css';



const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

const ThemeSelector = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.text};
`;

const LanguageSelector = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.text};
`;

const SectionBlock = styled.section`
  display: flex;
  gap: 10px;
`;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const getCurrentTheme = () => {
    return theme === 'dark' ? darkTheme : lightTheme;
  };

  return (
    <ThemeProvider theme={getCurrentTheme()}>
      <div className="App">
        <Header>
          <h1>Simple Code Editor</h1>
          <SectionBlock>
            <ThemeSelector onChange={handleThemeChange} value={theme}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </ThemeSelector>
            <LanguageSelector onChange={handleLanguageChange} value={selectedLanguage}>
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </LanguageSelector>
          </SectionBlock>
        </Header>
        <CodeEditor theme={getCurrentTheme()} selectedLanguage={selectedLanguage} />
      </div>
    </ThemeProvider>
  );
};

export default App;
