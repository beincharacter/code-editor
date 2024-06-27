import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CodeEditor from './CodeEditor';
import { lightTheme, darkTheme, systemTheme } from './themes';

const ThemeSelector = styled.select`
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.editorBackground};
  color: ${props => props.theme.text};
`;

const App = () => {
  const [theme, setTheme] = useState('system');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const getCurrentTheme = () => {
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? darkTheme : lightTheme;
    }
    return theme === 'dark' ? darkTheme : lightTheme;
  };

  return (
    <ThemeProvider theme={getCurrentTheme()}>
      <div className="App">
        <h1>Simple Code Editor</h1>
        <ThemeSelector onChange={handleThemeChange} value={theme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </ThemeSelector>
        <CodeEditor theme={getCurrentTheme()} />
      </div>
    </ThemeProvider>
  );
};

export default App;
