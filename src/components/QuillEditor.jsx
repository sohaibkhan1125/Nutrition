import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.min.css';
import './QuillEditor.css';
import { supabase } from '../supabaseClient';
// Import FontAwesome 6 if not already present. 
// Assuming the user might need it, but we can't easily add <link> tags in component. 
// We'll trust the user or add it via useEffect if really needed, but better to assume project handles fonts.
// However, the provided code specifically requested FA 6.5.1.
// We'll leave it to the user's index.html or rely on existing fonts if possible, or we can use react-icons if preferred.
// But valid requirement is to use the provided classes.

const QuillEditor = ({ initialContent, onSave }) => {
    const [editorHtml, setEditorHtml] = useState(initialContent || '');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lastSaved, setLastSaved] = useState('Unsaved');
    const [darkMode, setDarkMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [generatedCode, setGeneratedCode] = useState('');

    const editorRef = useRef(null); // Ref for the editor container div
    const quillInstance = useRef(null);
    const fileInputRef = useRef(null);

    // Initialize Quill
    useEffect(() => {
        if (quillInstance.current) return;

        // Custom Toolbar Configuration
        const toolbarOptions = [
            // Header & Font
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],

            // Formatting
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],

            // Block Formatting
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent

            // Elements
            ['blockquote', 'code-block'],
            ['link', 'image'], // video removed as per requirement for text/image focus

            // Utility
            ['clean'] // remove formatting
        ];

        quillInstance.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        image: imageHandler // Custom image handler
                    }
                },
                history: { // Undo/Redo
                    delay: 1000,
                    maxStack: 50,
                    userOnly: true
                }
            },
            placeholder: 'Start writing your document here...'
        });

        // Text Change Listener
        quillInstance.current.on('text-change', () => {
            updateStats();
            const content = quillInstance.current.root.innerHTML;
            setEditorHtml(content);
        });

        // Initial content
        if (initialContent) {
            quillInstance.current.root.innerHTML = initialContent;
            updateStats();
        }

    }, []);

    // Sync initialContent updates (e.g. loaded from DB)
    useEffect(() => {
        if (quillInstance.current && initialContent && quillInstance.current.root.innerHTML !== initialContent) {
            // Only update if significantly different to avoid cursor jumps, or just once on load.
            // For simple admin use, replacing implementation is fine if it's the first load.
            // We'll rely on the parent to pass initialContent only once or handle loading state.
        }
    }, [initialContent]);

    const updateStats = () => {
        if (!quillInstance.current) return;
        const text = quillInstance.current.getText();
        const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length > 1 ? text.length - 1 : 0;
        setWordCount(words);
        setCharCount(chars);
    };

    const imageHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && /^image\//.test(file.type)) {
            saveImage(file);
        } else if (file) {
            showToast('Please select a valid image file', 'error');
        }
    };

    const saveImage = (file) => {
        // Convert to Base64 as per request
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const range = quillInstance.current.getSelection(true);
            quillInstance.current.insertEmbed(range.index, 'image', reader.result);
            quillInstance.current.setSelection(range.index + 1);
            showToast('Image inserted successfully');
        };
    };

    const handleSave = async () => {
        const content = quillInstance.current.root.innerHTML;
        // localStorage backup
        localStorage.setItem('quill_editor_content', content);

        // Call parent onSave
        if (onSave) {
            try {
                await onSave(content);
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setLastSaved(`Saved at ${timeString}`);
                showToast('Document saved successfully');
            } catch (error) {
                showToast('Error saving: ' + error.message, 'error');
            }
        } else {
            // Fallback if no props
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setLastSaved(`Saved locally at ${timeString}`);
            showToast('Document saved locally');
        }
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
            quillInstance.current.setContents([]);
            setEditorHtml('');
            showToast('Editor cleared');
        }
    };

    const convertToCode = () => {
        const html = quillInstance.current.root.innerHTML;
        const formatted = formatHTML(html);
        setGeneratedCode(formatted);
        setShowCodeModal(true);
        // Prism highlight needs to run after render.
        setTimeout(() => {
            if (window.Prism) {
                Prism.highlightAll();
            }
        }, 100);
    };

    const formatHTML = (html) => {
        let formatted = '';
        let indent = '';
        const tab = '    ';
        html.split(/>\s*</).forEach(function (element) {
            if (element.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + element + '>\r\n';
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input") && !element.startsWith("img") && !element.startsWith("br")) {
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    };

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`quill-editor-wrapper ${darkMode ? 'dark-mode' : ''}`}>
            {/* Header */}
            <header className="quill-header">
                <div className="quill-logo">
                    <i className="fas fa-pen-nib"></i>
                    Professional Editor
                </div>
                <div className="quill-header-controls">
                    <button className="quill-btn quill-btn-primary" onClick={convertToCode}>
                        <i className="fas fa-code"></i> Convert Text to Code
                    </button>
                    <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 5px' }}></div>
                    <button className="quill-btn quill-btn-icon" onClick={toggleTheme} title="Toggle Dark Mode">
                        {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                    </button>
                    <button className="quill-btn quill-btn-icon" onClick={() => setIsFullscreen(!isFullscreen)} title="Fullscreen">
                        {isFullscreen ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i>}
                    </button>
                    <button className="quill-btn quill-btn-icon" onClick={handleClear} title="Clear All">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="quill-btn" onClick={handleSave} title="Save Content">
                        <i className="fas fa-save"></i> Save
                    </button>
                </div>
            </header>

            {/* Main Editor */}
            <div className={`quill-editor-container ${isFullscreen ? 'fullscreen' : ''}`}>
                <div ref={editorRef} style={{ height: 'calc(100% - 42px)' }}></div>
            </div>

            {/* Status Bar */}
            <div className="quill-stats-bar">
                <div className="quill-stats-group">
                    <span>{wordCount} words</span>
                    <span>{charCount} characters</span>
                </div>
                <div className="quill-stats-group">
                    <span>{lastSaved}</span>
                </div>
            </div>

            {/* View Code Modal */}
            {showCodeModal && (
                <div className={`quill-modal active`}>
                    <div className="quill-modal-content">
                        <div className="quill-modal-header">
                            <h3><i className="fas fa-file-code"></i> Generated HTML Code</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="quill-btn" onClick={() => {
                                    navigator.clipboard.writeText(generatedCode);
                                    showToast('HTML code copied to clipboard');
                                }}>
                                    <i className="fas fa-copy"></i> Copy HTML
                                </button>
                                <button className="quill-btn btn-icon" onClick={() => setShowCodeModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="quill-modal-body">
                            <pre className="quill-code-output"><code className="language-html">{generatedCode}</code></pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            <div className={`quill-toast ${toast.show ? 'show' : ''}`} style={{ borderLeftColor: toast.type === 'error' ? 'var(--error-color)' : 'var(--primary-color)' }}>
                <i className="fas fa-check-circle"></i>
                <span>{toast.message}</span>
            </div>

            <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

            {/* Link for FontAwesome 6 if needed by the component's classes */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        </div>
    );
};

export default QuillEditor;
