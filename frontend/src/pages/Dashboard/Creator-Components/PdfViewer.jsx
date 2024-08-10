import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the workerSrc for pdfjs to use the local copy
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFViewer = ({ src }) => {
    const [fileUrl, setFileUrl] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (src) {
            setFileUrl(URL.createObjectURL(src));
        }
    }, [src]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        setError(error.message);
    };

    return (
        <div style={{ height: '100vh' }}>
            {error && <div>Error loading PDF: {error}</div>}
            {fileUrl && (
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            )}
        </div>
    );
};

export default PDFViewer;
