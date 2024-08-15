import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFComponent from './Pdf';

const DownloadPDFButton = ({id}) => (
  <PDFDownloadLink document={<PDFComponent id={id} />} fileName="example.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

export default DownloadPDFButton;