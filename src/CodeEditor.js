import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from './prism';
import styled, { ThemeProvider } from 'styled-components';

const CodeEditorContainer = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  border: 1px solid ${props => props.theme.borderColor};
  padding: 16px;
  border-radius: 4px;
  background: ${props => props.theme.editorBackground};
  display: flex;
  height: 100vh;
  overflow: auto;

  pre {
    margin: 0;
  }
`;

const LineNumbers = styled.div`
  padding: 10px;
  background: ${props => props.theme.lineNumberBackground};
  border-right: 1px solid ${props => props.theme.borderColor};
  user-select: none;
  color: ${props => props.theme.text};
`;

const CodeContainer = styled.div`
  flex-grow: 1;
  color: ${props => props.theme.text};
`;

const autoClosePairs = {
  '(': ')',
  '{': '}',
  '[': ']',
  '"': '"',
  "'": "'",
  '`': '`',
};

const CodeEditor = ({ theme, selectedLanguage }) => {
  const [code, setCode] = useState('');

  const handleValueChange = (newCode) => {
    const lastChar = newCode[newCode.length - 1];
    if (autoClosePairs[lastChar]) {
      const cursorPosition = newCode.length;
      
      newCode = newCode.slice(0, cursorPosition) + autoClosePairs[lastChar] + newCode.slice(cursorPosition);
    }

    setCode(newCode);
  };

  const highlight = (code, lang) => {
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } else {
      return code;
    }
  };

  const lineNumbers = code.split('\n').map((_, index) => index + 1).join('\n');

  return (
    <ThemeProvider theme={theme}>
      <CodeEditorContainer>
        <LineNumbers>
          <pre>{lineNumbers}</pre>
        </LineNumbers>
        <CodeContainer>
          <Editor
            value={code}
            onValueChange={handleValueChange}
            highlight={code => highlight(code, selectedLanguage)}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
            }}
          />
        </CodeContainer>
      </CodeEditorContainer>
    </ThemeProvider>
  );
};

export default CodeEditor;
