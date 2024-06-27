import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from './prism';
import styled from 'styled-components';

const highlight = code => Prism.highlight(code, Prism.languages.javascript, 'javascript');

const CodeEditorContainer = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
  background: #f5f5f5;
  display: flex;

  pre {
    margin: 0;
  }
`;

const LineNumbers = styled.div`
  padding: 10px;
  background: #eee;
  border-right: 1px solid #ddd;
  user-select: none;
`;

const CodeContainer = styled.div`
  flex-grow: 1;
`;

const CodeEditor = () => {
  const [code, setCode] = useState('');

  const lineNumbers = code.split('\n').map((_, index) => index + 1).join('\n');

  return (
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
  );
};

export default CodeEditor;
