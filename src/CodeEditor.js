import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from './prism';
import styled, { ThemeProvider } from 'styled-components';

const highlight = code => Prism.highlight(code, Prism.languages.javascript, 'javascript');

const CodeEditorContainer = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  border: 1px solid ${props => props.theme.borderColor};
  padding: 16px;
  border-radius: 4px;
  background: ${props => props.theme.editorBackground};
  display: flex;

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

const CodeEditor = ({ theme }) => {
  const [code, setCode] = useState('');

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
            onValueChange={newCode => setCode(newCode)}
            highlight={highlight}
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
