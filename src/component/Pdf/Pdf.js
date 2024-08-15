import React, { useEffect, useState } from "react";
// import { ReactComponent as RupeeIcon } from "../../image/rupee-sign-svgrepo-com.svg";
import rupimage from "../../image/rupee.png"
import {
  Page,
  Text,
  Image,
  View,
  Font ,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import logoimg from "../../image/logo.png";
import axios from "axios";
const borderColor = "#3BB77E";
const fontUrl = 'https://examplecdn.com/arial.ttf'; // Hypothetical CDN URL

Font.register({ family: 'Arial', src: fontUrl });
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
  },
  billTo: {
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    height:"auto",
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 180,
    height: 55,
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-start",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottom: 1,
    borderBottomColor: borderColor,
    paddingBottom: 10,
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {},
  marginLabel: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    color: "white",
  },
  description: {
    width: "60%",
    border: "1px solid #3BB77E",
    paddingRight: 8,
    fontSize: 13,
  },
  qty: {
    width: "10%",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 8,
  },

  row: {
    flexDirection: "row",
    borderBottomColor: "#3BB77E",
    borderBottomWidth: 1,
    borderLeft: 1,
    borderRight: 1,
    borderLeftColor: "#3BB77E",
    borderRightColor: "#3BB77E",
    alignItems: "center",
    height: 24,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    fontStyle: "bold",
  },
  addressrow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottom: 1,
    borderBottomColor: borderColor,
    marginBottom: 30,
    paddingBottom: 10,
  },
  descriptionTotal: {
    width: "85%",
    textAlign: "right",
 // borderRightColor: borderColor,
    // borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#3BB77E",
    backgroundColor: "#3BB77E",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    color: "#fff",
    textAlign: "center",
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    marginLeft: 10,
    fontSize: 10,
  },
  qty: {
    width: "10%",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  rate: {
    width: "15%",
    // borderRightColor: borderColor,
    // borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  totalrow:{
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    marginTop:30
  },
  totalbox:{
  width:"30%",
  },
  Fonttotal:{
  },
  totalrowtext:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between"

  },
  flex:{
display:"flex",
alignItems:"center",
flexDirection:"row"


  },
  rupimage:{
    width:8 ,
    marginBottom:5
  }

});

const PDFComponent = ({ id }) => {
  const [itemdata, setItemdata] = useState();
  useEffect(() => {
    getsingle();
  }, []);
  console.log(itemdata);
  const getsingle = async () => {
    await axios
      .get(`http://localhost:2000/order/${id}`)
      .then(function (response) {
        // handle success
        setItemdata(response.data);
        console.log("responseresponseresponseresponseresponse", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const createdAtDate = new Date(itemdata?.createdAt);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = `${
    monthNames[createdAtDate.getMonth()]
  } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()} `;
  return (
    <Document fontFamily="Arial">
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logoimg} />

        <View style={styles.invoiceNoContainer}>
          <Text style={styles.label}>Order number:</Text>
          <Text style={styles.invoiceDate}>{itemdata?.ordernumber}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.invoiceDate}>{formattedDate}</Text>
        </View>
        <View style={styles.addressrow}>
          <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Bill From :</Text>
            <Text>india</Text>
            <Text>Silver Business Point, 2026 - 2027, VIP Cir, </Text>
            <Text> Surat,Gujarat,394105</Text>
            <Text>+91 {itemdata?.userId?.phoneNumber}</Text>
            <Text>rahulrathod@gmail.com</Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text>{itemdata?.Addressid?.country}</Text>
            <Text>{itemdata?.Addressid?.address},</Text>
            <Text>
              {" "}
              {itemdata?.Addressid?.city}, {itemdata?.Addressid?.state},{" "}
              {itemdata?.Addressid?.postalCode}
            </Text>
            <Text>+91 {itemdata?.userId?.phoneNumber}</Text>
            <Text>{itemdata?.userId?.email}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.description}>Item Description</Text>
          <Text style={styles.qty}>Qty</Text>
          <Text style={styles.rate}>price</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>

        {itemdata?.Product?.map((item) => {
          return (
            <>
              <View style={styles.row}>
                <Text style={styles.description}>{item.productId.name} </Text>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Text style={styles.rate}>{item.productId.price}</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            </>
          );
        })}
        <View style={styles.totalrow}>
          <View style={styles.totalbox}>
          <View style={styles.totalrowtext}><Text>subtotal:</Text><View style={styles.flex}>  <Image style={styles.rupimage} src={rupimage} /> <Text>{itemdata?.subtotal}</Text></View> </View>
            <View style={styles.totalrowtext}><Text>discount:</Text><View style={styles.flex}>  <Image style={styles.rupimage} src={rupimage} /> <Text>00</Text></View> </View>
            <View style={styles.totalrowtext}><Text>text:</Text><View style={styles.flex}>  <Image style={styles.rupimage} src={rupimage} /> <Text>00</Text></View> </View>
            <View style={styles.totalrowtext}><Text>paid:</Text><View style={styles.flex}>  <Image style={styles.rupimage} src={rupimage} /> <Text>{itemdata?.subtotal}</Text></View></View>
          </View>
          {/* <Text style={styles.descriptionTotal}>TOTAL</Text> */}
          {/* <Text style={styles.total}>{itemdata?.subtotal}</Text> */}
        </View>
      </Page>
    </Document>
  );
};

export default PDFComponent;
