"use client";

import React from "react";
import ReactDOM from "react-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { Prisma } from "@prisma/client";
import { Invoice } from "@/app/invoice/[orderId]/page";
import { Loader2 } from "lucide-react";

Font.register({
  family: "Sarabun",
  fonts: [
    { src: "/fonts/Sarabun-Thin.ttf", fontWeight: 100 },
    { src: "/fonts/Sarabun-ExtraLight.ttf", fontWeight: 200 },
    { src: "/fonts/Sarabun-Light.ttf", fontWeight: 300 },
    { src: "/fonts/Sarabun-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Sarabun-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Sarabun-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Sarabun-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/Sarabun-ExtraBold.ttf", fontWeight: 800 },
  ],
});

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="size-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
  },
);

const styles = StyleSheet.create({
  body: {
    paddingVertical: 35,
    paddingHorizontal: 35,
    height: "100%",
    fontFamily: "Sarabun",
    fontWeight: 300,
    fontSize: 11,
    gap: 12,
  },
  vendorInfo: {
    display: "flex",
    textAlign: "center",
    gap: 2,
  },
  vendorName: {
    fontSize: 13,
    fontWeight: "400",
  },
  title: {
    display: "flex",
    textAlign: "center",
  },
  taxDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  },
  between: {
    width: 160,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  betweenTitle: {
    width: 35,
    textAlign: "right",
  },
  vendorTaxPhone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    gap: 4,
  },
  buyerInfo: {
    display: "flex",
    gap: 2,
  },
  buyerInfoItem: {
    display: "flex",
    flexDirection: "row",
  },
  buyerTitle: {
    width: 60,
  },
  TaxTitle: {
    width: 110,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    marginTop: 14,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottom: "1px solid black",
  },
  rowLastChild: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  cell: {
    flex: 1,
    paddingHorizontal: "4px",
    paddingVertical: "2px",
    borderRight: "1px solid black",
    minHeight: 16,
  },
  centerText: {
    textAlign: "center",
  },
  rightText: {
    textAlign: "right",
  },
  leftText: {
    textAlign: "left",
  },
  headerText: {
    textAlign: "center",
  },
  nameCell: {
    flex: 5,
  },
  priceCell: {
    flex: 2,
    borderRight: "0px",
  },

  priceTable: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    border: "1px solid white",
    borderRight: "1px solid black",
    borderTop: "0px",
  },
  hiddenRightBorder: {
    borderRight: "1px solid white",
  },
  signWrap: {
    display: "flex",
    flexDirection: "row",
    height: "35px",
    gap: "5px",
  },
  colEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  signPlaceholder: {
    borderTop: "1px solid black",
    paddingHorizontal: "50px",
    paddingTop: "5px",
  },
  outerWrap: {
    display: "flex",
    flexDirection: "row",
    height: "35px",
    gap: "5px",
  },
});

type PDFDocumentProps = {
  data: Invoice | null;
};

const PDFDocument = ({ data }: PDFDocumentProps) => {
  const sumPrice = data?.carts.reduce(
    (sum, item) => sum + (item.products?.price || 0),
    0,
  );
  const taxPrice = (sumPrice || 0) * 0.07;
  const totalPrice = (sumPrice || 0) + taxPrice;

  const pricesValue: { title: string; value: string }[] = [
    {
      title: "ราคารวมทั้งสิ้น ",
      value: sumPrice?.toString() || "",
    },
    { title: "จำนวนภาษีมูลค่าเพิ่ม 7% ", value: taxPrice.toString() },
    { title: "จำนวนเงินทั้งสิ้น ", value: totalPrice.toString() },
  ];
  return (
    <PDFViewer className="size-full">
      <Document title={`${data?.name} ${data?.number}`}>
        <Page style={styles.body}>
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName}>{data?.vendor.name} </Text>
            <Text>{data?.vendor.address} </Text>
            <View style={styles.vendorTaxPhone}>
              <Text>โทร. {data?.vendor.phone}</Text>
              <Text>เลขประจำตัวผู้เสียภาษี {data?.vendor.taxId}</Text>
            </View>
          </View>
          <View style={styles.title}>
            <Text>ใบเสร็จรับเงิน / ใบกำกับภาษี </Text>
            <Text>Tax Invoice </Text>
          </View>
          <View style={styles.taxDate}>
            <View style={styles.between}>
              <Text style={styles.betweenTitle}>เลขที่</Text>
              <Text>{data?.number}</Text>
            </View>
            <View style={styles.between}>
              <Text style={styles.betweenTitle}>วันที่</Text>
              <Text>{data?.date.toLocaleDateString("th-TH")}</Text>
            </View>
          </View>
          <View style={styles.buyerInfo}>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.buyerTitle}>นามผู้ซื้อ</Text>
              <Text>{data?.name}</Text>
            </View>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.buyerTitle}>ที่อยู่ผู้ซื้อ</Text>
              <Text>{data?.address}</Text>
            </View>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.TaxTitle}>เลขที่ผู้เสียภาษีผู้ซื้อ</Text>
              <Text>{data?.taxId}</Text>
            </View>
          </View>
          {/* table */}
          <View>
            <View style={styles.table}>
              <View style={[styles.row]}>
                <Text
                  style={[styles.headerText, styles.cell, styles.centerText]}
                >
                  ลำดับที่{" "}
                </Text>
                <Text style={[styles.headerText, styles.cell, styles.nameCell]}>
                  รายการ{" "}
                </Text>
                <Text style={[styles.headerText, styles.cell]}>จำนวน </Text>
                <Text style={[styles.headerText, styles.cell]}>
                  ราคา (หน่วย){" "}
                </Text>
                <Text
                  style={[
                    styles.headerText,
                    styles.cell,
                    styles.rightText,
                    styles.priceCell,
                  ]}
                >
                  จำนวนเงิน (ไม่รวมภาษี){" "}
                </Text>
              </View>
              {Array.from({
                length: Math.max(19, data?.carts?.length || 0),
              }).map((_, index) => {
                const cart = data?.carts[index];

                return (
                  <View
                    style={index === 18 ? styles.rowLastChild : styles.row}
                    key={cart?.id || index}
                  >
                    <Text style={[styles.cell, styles.centerText]}>
                      {cart ? index + 1 : ""}
                    </Text>
                    <Text style={[styles.cell, styles.nameCell]}>
                      {cart?.products?.title || ""}
                    </Text>
                    <Text style={[styles.cell, styles.centerText]}>
                      {cart?.amount || ""}
                    </Text>
                    <Text style={[styles.cell, styles.centerText]}>
                      {cart?.products?.price || ""}
                    </Text>
                    <Text
                      style={[styles.cell, styles.rightText, styles.priceCell]}
                    >
                      {cart ? cart.amount * (cart.products?.price || 0) : ""}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* priceTable */}
            {pricesValue.map((priceValue, index) => (
              <View style={styles.priceTable} key={index}>
                <View style={[styles.rowLastChild]}>
                  <Text style={[styles.cell, styles.hiddenRightBorder]} />
                  <Text
                    style={[
                      styles.cell,
                      styles.hiddenRightBorder,

                      styles.centerText,
                    ]}
                  />
                  <Text
                    style={[
                      styles.cell,
                      styles.centerText,
                      styles.hiddenRightBorder,
                      {
                        flex: 3,
                      },
                    ]}
                  />
                  <Text style={[styles.cell, styles.leftText, { flex: 3 }]}>
                    {priceValue.title}
                  </Text>
                  <Text
                    style={[
                      styles.cell,
                      styles.priceCell,
                      { borderBottom: "1px solid black" },
                      styles.rightText,
                    ]}
                  >
                    {priceValue.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {/* Signature */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "18.5%",
              marginTop: "20px",
            }}
          >
            <View style={styles.signWrap}>
              <Text>ลงชื่อ</Text>
              <View style={styles.colEnd}>
                <Text style={styles.signPlaceholder}>ผู้รับสินค้า</Text>
              </View>
            </View>
            <View
              style={[
                styles.outerWrap,
                {
                  marginTop: "14.5px",
                },
              ]}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={styles.signPlaceholder}>ผู้มีอำนาจอนุมัติ </Text>
                <Text style={{ marginLeft: -30, marginTop: 10 }}>
                  วันที่ {"  "}..................... /.....................
                  /.....................
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.signWrap}>
            <View style={styles.outerWrap}>
              <Text>ลงชื่อ</Text>
              <View style={styles.colEnd}>
                <Text style={styles.signPlaceholder}>ผู้ส่งสินค้า</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
