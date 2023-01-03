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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import './style.css';
  import { CircularProgress } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';

import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DownloadButton = ({bookId}) =>  {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Call the API to fetch the base64 encoded PDF
    axios.get('/api/upload?id=' + bookId)
      .then(({data}) => {
      // .then(response => {
        // Create a Blob from the base64 PDF string
        const blob = new Blob([data.data], { type: 'application/pdf' });

        // Create a link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'document.pdf';

        // Add the link to the DOM and click it
        document.body.appendChild(downloadLink);
        downloadLink.click();
          enqueueSnackbar('Downloading pdf', { variant: 'success'})
      })
      .catch(err => enqueueSnackbar('Download Failed. Check your connection.', { variant: 'error'}))
      .finally(() => {
        // Remove the link from the DOM
        setLoading(false);
      })
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick} disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <CloudDownload />}>
      Download PDF
    </Button>
  );
}

const BookPreview = ({open, handleClose, bookId})  => {

  const viewer = useRef(null);
  const [book, setBook] = useState({})
  const [pageCount, setPageCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState('next');
  const [ pages, setPages ] = useState([])
  const containerRef = useRef(null)
  const onDocumentLoadSuccess = ({ numPages }) => {
      console.log('Bro... 💀')
      setPageCount(numPages);
      setPages(Array.from({length: numPages}, (_, i) => i + 1))
      containerRef.current && console.log('OffsetWidth', containerRef.current.offsetWidth)
    }

  // Create custom hook to fetch the book
  useEffect(() => {
      axios.get('/api/upload?id=' + bookId)
              .then(({data}) => {
                setBook(data);
              })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId])

  const reset = () => {
    direction && setDirection('next')
    pageNumber && setPageNumber(1)
    pages && setPages([])
    pageCount && setPageCount(null)
    handleClose()
  }
  return (
      <Dialog
        fullScreen
        open={open}
        onClose={reset}
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
                          <DownloadButton bookId={book.id} />
                       </ListItem>)   
            }

          <Divider />
        </List>
        { book?.data  &&
         (<div id="ReaderContainer">
              <Document className={'PDFDocument'} file={`data:application/pdf;base64,${book.data}`} onLoadSuccess={onDocumentLoadSuccess}>
                  {pages.map(page => (
                    <>
                      <Page 
                      className={'PDFPage PDFPageOne'}
                      renderMode={'canvas'}
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      renderInteractiveForms={false}
                      key={page}
                      />
                    </>
                    ))}
              </Document>
          </div>)   
        }
       
      </Dialog>
  );
}

export default BookPreview;