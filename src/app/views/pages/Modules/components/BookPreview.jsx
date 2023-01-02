import { useEffect, useState, useRef, forwardRef } from 'react'
import axios from 'axios'
import { animated, useSpring, useSprings } from '@react-spring/web'
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
import { useDrag } from '@use-gesture/react'
import { Slider } from './Slider'
import './style.css';
  import { Icon, CircularProgress } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';

import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

const PageTransition =({ children, pageNumber, direction }) =>  {
  const containerRef = useRef(null)
  const [{ scrollTopValue }, set] = useSpring(() => ({ scrollTop: 0 }))

  const handlePageTransition = () => {
    const pageHeight = containerRef.current.offsetHeight
    console.log('Page Height', pageHeight + 'px')
    const nextScrollTop = pageHeight*pageNumber
    set({ scrollTop: nextScrollTop })
    console.log('Scrolling from', scrollTopValue + 'px to', nextScrollTop + 'px.')
  }

 useEffect(() => {

    console.warn('Current Container:',containerRef)
    handlePageTransition()
 },[pageNumber])

  return (
    <div ref={containerRef} style={{ overflowY: 'scroll' }}>
      <animated.div 
        style={{ height: '100%', scrollTopValue}}
       >
        {children}
      </animated.div>
    </div> 
  )
}

const AnimatedPage = animated(Page)

const PDFPage = ({ children, width}) =>  {
  const [springs, api] = useSprings(children.length,() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my], args: [index] }) => {
    api.start((i) => i === index && { x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })
  // Bind it to a component
  return springs.map(({x, y}, i) => (
    <Box mt="2" mx="auto" style={{ borderRadius: 4 }} key={i}>
      <animated.div {...bind(i)} key={i} style={{ x, y}} children={children[i]} />
    </Box>
    ))
}

const DraggableList = ({ children }) => {
  const [springs, api] = useSprings(children.length, () => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my], args: [index] }) => {
    api.start((i) => i === index && { x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  return children.map((child, idx) => (
    <animated.div {...bind(idx)} key={idx} style={{ x: springs[idx].x, y: springs[idx].y }} children={child} />
  ));
};

const BookPreview = ({open, handleClose, bookId})  => {

  const viewer = useRef(null);
  const [book, setBook] = useState({})
  const [pageCount, setPageCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState('next');
  const [ pages, setPages ] = useState([])
  const containerRef = useRef(null)
  const [pdfWidth, setPDFWidth] = useState(0)
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
  }, [bookId])
 useEffect(() => {

      containerRef.current && console.log('Container Ref', containerRef.current)
      containerRef.current && setPDFWidth(containerRef.current.offsetWidth*0.85)
  }, [containerRef.current])

  const reset = () => {
    setDirection('next')
    setPageNumber(1)
    setPages([])
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

          <Divider />{/*
          <ListItem>
                <Typography>Sample React Draggable Component</Typography> 
                  <Slider items={Array.from({length: 25}, (_, i) => i + 1)}>
                    {Array.from({length: 25}, (_, i) => i + 1).map(i => 
                        (<Box mx="auto" mt="2em" style={{ backgroundColor: '#91c9f9', width: 200, height: 200, borderRadius: 4}} key={i}>
                        </Box>)  
                    )}
                  </Slider>
          </ListItem>*/}
        </List>
        { book?.data  &&
        //{ pages.length > 0   && (
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