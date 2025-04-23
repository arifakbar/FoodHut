import React from "react";
// import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
// import {
//   Table,
//   TableHeader,
//   TableCell,
//   TableBody,
//   DataTableCell,
// } from "@david.kucsai/react-pdf-table";

const Invoice = ({}) => {
  <div>Invoice</div>;
};

// const Invoice2 = ({ order }) => (
//   <Document>
//     <Page style={styles.body}>
//       <Text style={styles.header} fixed>
//         ~ {new Date().toLocaleString()} ~
//       </Text>
//       <Text style={styles.title}>Order Invoice</Text>
//       <Text style={styles.author}>Food Hut</Text>
//       <Text style={styles.subtitle}>Order Summary</Text>

//       <Table>
//         <TableHeader>
//           <TableCell style={styles.center}>Title</TableCell>
//           <TableCell style={styles.center}>Price</TableCell>
//           <TableCell style={styles.center}>Quantity</TableCell>
//           <TableCell style={styles.center}>Total</TableCell>
//         </TableHeader>
//       </Table>

//       <Table data={order.products}>
//         <TableBody>
//           <DataTableCell
//             style={styles.center}
//             getContent={(x) => x?.product?.title}
//           />
//           <DataTableCell
//             style={styles.center}
//             getContent={(x) => `Rs. ${x?.product?.price}`}
//           />
//           <DataTableCell style={styles.center} getContent={(x) => x?.count} />
//           <DataTableCell
//             style={styles.center}
//             getContent={(x) => x?.product?.price * x?.count}
//           />
//         </TableBody>
//       </Table>

//       <Text style={styles.text}>
//         <Text>
//           Date: {"               "}
//           {new Date(order.paymentIntent.created * 1000).toLocaleString()}
//         </Text>
//         {"\n"}
//         <Text>
//           Order Id: {"          "}
//           {order.paymentIntent.id}
//         </Text>
//         {"\n"}
//         <Text>
//           Order Status: {"  "}
//           {order.orderStatus}
//         </Text>
//         {"\n"}
//         <Text>
//           Total Paid: {"       "}
//           Rs. {order.paymentIntent.amount / 100}
//         </Text>
//       </Text>

//       <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
//     </Page>
//   </Document>
// );

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 35,
//     paddingBottom: 65,
//     paddingHorizontal: 35,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//   },
//   author: {
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   subtitle: {
//     fontSize: 18,
//     margin: 12,
//   },
//   text: {
//     margin: 12,
//     fontSize: 14,
//     textAlign: "justify",
//   },
//   image: {
//     marginVertical: 15,
//     marginHorizontal: 100,
//   },
//   header: {
//     fontSize: 12,
//     marginBottom: 20,
//     textAlign: "center",
//     color: "grey",
//   },
//   footer: {
//     padding: "100px",
//     fontSize: 12,
//     marginBottom: 20,
//     textAlign: "center",
//     color: "grey",
//   },
//   pageNumber: {
//     position: "absolute",
//     fontSize: 12,
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     color: "grey",
//   },
//   center: {
//     textAlign: "center",
//   },
// });

export default Invoice;
