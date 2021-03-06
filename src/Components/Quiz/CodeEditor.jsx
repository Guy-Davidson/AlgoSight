import React, { useState, useRef, useEffect } from 'react';
import '../../sass/Components/Quiz/CodeEditor.scss'
import CodeEditorHeader from './CodeEditorHeader'; 

import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";

import Tester from './Tester'


const CodeEditor = (props) => {
    const { question } = props;
    const [version, setVersion] = useState(1);     
    const [version1Code, setVersion1Code] = useState("");
    const [version2Code, setVersion2Code] = useState("");
    const [version3Code, setVersion3Code] = useState("");
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [userInput, setUserInput] = useState(null)
    
    const aceEditorRef = useRef(null);

    const handleRunClick = () => {               
        if(version === 1){                         
            setUserInput(version1Code)  
        }else if(version === 2){
            setUserInput(version2Code)                      
        }else if(version === 3){
            setUserInput(version3Code)
        }  
        setIsEvaluating(true)
    }

    const handleVersionClick = (number) => {
        setVersion(number);
    }

    useEffect( () => {        
        handleResetClick()
    }, [question])

    const handleResetClick = () => {                
        if(version === 1){
            setVersion1Code("");                       
        }else if(version === 2){
            setVersion2Code("");
        }else if(version === 3){
            setVersion3Code("");
        }        

        aceEditorRef.current.editor.setValue(question.solutionDefault);
    }

    const onChange = (newValue) => {          
        if(version === 1){
            setVersion1Code(newValue);
        } else if(version === 2){
            setVersion2Code(newValue);
        } else if(version === 3){
            setVersion3Code(newValue);
        }       
        setIsEvaluating(false)  
      }

    const renderEditor = () => {        
        let editorInitText = question.solutionDefault;

        if(version === 1 && version1Code){
            editorInitText = version1Code
        }else if(version === 2 && version2Code){
            editorInitText = version2Code
        }else if(version === 3 && version3Code){
            editorInitText = version3Code
        }

        return (
            <AceEditor
            className='ace-editor'
            ref={aceEditorRef}
            value={editorInitText}
            mode="javascript"
            theme="twilight"
            onChange={onChange}
            name="123-123-123"
            editorProps={{ $blockScrolling: true }}
            fontSize='16px'
            width='100%'
            height='95%'
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}
          />
        )
    }

    return (
        <div className='EditorWrapper'>
            <div className='code-editor'>                
                <CodeEditorHeader 
                handleRunClick={handleRunClick}
                handleVersionClick={handleVersionClick}
                handleResetClick={handleResetClick}/>
                {question && version === 1 && renderEditor()}
                {question && version === 2 && renderEditor()}
                {question && version === 3 && renderEditor()}                
            </div>
            {question && isEvaluating && <Tester question={question} userInput={userInput}/>}
        </div>
    )
}

export default CodeEditor;