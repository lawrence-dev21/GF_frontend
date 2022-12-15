import { useEffect, useState, useRef, forwardRef } from 'react'
import axios from 'axios'

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// import WebViewer from '@pdftron/pdfjs-express';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const base64ToBlob = (base64) => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/pdf' });
};
  
const BookPreview = ({open, handleClose, bookId})  => {

  const viewer = useRef(null);
  const [book, setBook] = useState({})
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    }

  useEffect(() => {
      axios.get('/api/upload?id=' + bookId)
              .then(({data}) => {
                console.log(data);
                setBook(data);
                // WebViewer({
                //       path: '/public',
                //       initialDoc: '/sample.pdf',
                //       },
                //     viewer.current,
                //   ).then((instance) => {
                //      instance.UI.loadDocument(base64ToBlob(data.data), { filename: 'myfile.pdf' });
                //     });
              })
  }, [bookId])

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Preview Book
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
            { book?.id && (<ListItem button>
                         <ListItemText primary="Book Id" secondary={book.id} />
                       </ListItem>)   
            }
          <Divider />
        </List>
        { book?.data && (
              <div style={{margin: 'auto'}}>
                <Document file={`data:application/pdf;base64,${book.data}`} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="PDFExpress">
                  <div className="header">PDF Express sample</div>
                  <div className="webviewer" ref={viewer}></div>
                </div>
              </div>)   
        }
       
      </Dialog>
  );
}

export default BookPreview;