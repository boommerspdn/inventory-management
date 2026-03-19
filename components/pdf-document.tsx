"use client";

import { Order } from "@/app/types";
import { useProductStore } from "@/hooks/use-product-store";
import { useVendorStore } from "@/hooks/use-vendor-store";
import { priceFormatter } from "@/lib/utils";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PDFWrapper from "./pdf-wrapper";

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

const styles = StyleSheet.create({
  body: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    height: "100%",
    fontFamily: "Sarabun",
    fontWeight: 300,
    fontSize: 10,
    gap: 12,
  },
  vendorInfo: {
    display: "flex",
    textAlign: "center",
    gap: 2,
  },
  vendorName: {
    fontSize: 12,
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
  centerText: { textAlign: "center" },
  rightText: { textAlign: "right" },
  leftText: { textAlign: "left" },
  headerText: { textAlign: "center" },
  nameCell: { flex: 5 },
  priceCell: { flex: 2, borderRight: "0px" },
  priceTable: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    border: "1px solid white",
    borderRight: "1px solid black",
    borderTop: "0px",
  },
  hiddenRightBorder: { borderRight: "1px solid white" },
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
  fontSmall: { fontSize: 9 },
});

type PDFDocumentProps = {
  data: Order | null;
};

const PDFDocument = ({ data }: PDFDocumentProps) => {
  const getProductById = useProductStore((state) => state.getProductById);
  const getVendorById = useVendorStore((state) => state.getVendorById);

  const vendor = getVendorById(data?.vendorId ?? "");

  const cartItems =
    data?.orderedItems.map((item) => ({
      id: item.productId,
      amount: item.amount,
      product: getProductById(item.productId),
    })) ?? [];

  const sumPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.amount,
    0,
  );
  const taxPrice = sumPrice * 0.07;
  const totalPrice = sumPrice + taxPrice;

  const pricesValue = [
    { title: "ราคารวมทั้งสิ้น ", value: priceFormatter(sumPrice) },
    { title: "จำนวนภาษีมูลค่าเพิ่ม 7% ", value: priceFormatter(taxPrice) },
    { title: "จำนวนเงินทั้งสิ้น ", value: priceFormatter(totalPrice) },
  ];

  return (
    <PDFWrapper>
      <Document title={`${data?.name} ${data?.number}`}>
        <Page style={styles.body}>
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName}>{vendor?.name} </Text>
            <Text>{vendor?.address} </Text>
            <View style={styles.vendorTaxPhone}>
              <Text>โทร. {vendor?.phone}</Text>
              <Text>เลขประจำตัวผู้เสียภาษี {vendor?.taxId} </Text>
            </View>
          </View>
          <View style={styles.title}>
            <Text>ใบเสร็จรับเงิน / ใบกำกับภาษี </Text>
            <Text>Tax Invoice </Text>
          </View>
          <View style={styles.taxDate}>
            <View style={styles.between}>
              <Text style={styles.betweenTitle}>เลขที่</Text>
              <Text>{data?.number} </Text>
            </View>
            <View style={styles.between}>
              <Text style={styles.betweenTitle}>วันที่ </Text>
              <Text>
                {data?.date
                  ? new Date(data.date).toLocaleDateString("th-TH")
                  : ""}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.buyerInfo}>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.buyerTitle}>นามผู้ซื้อ </Text>
              <Text>{data?.name} </Text>
            </View>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.buyerTitle}>ที่อยู่ผู้ซื้อ </Text>
              <Text
                style={
                  (data?.address.length || 0) > 104 ? styles.fontSmall : {}
                }
              >
                {data?.address}{" "}
              </Text>
            </View>
            <View style={styles.buyerInfoItem}>
              <Text style={styles.TaxTitle}>เลขที่ผู้เสียภาษีผู้ซื้อ </Text>
              <Text>{data?.taxId} </Text>
            </View>
          </View>
          {/* table */}
          <View>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.centerText]}>ลำดับที่ </Text>
                <Text style={[styles.cell, styles.nameCell]}>รายการ </Text>
                <Text style={[styles.cell, styles.centerText]}>จำนวน </Text>
                <Text style={[styles.cell, styles.centerText]}>
                  ราคา (หน่วย){" "}
                </Text>
                <Text style={[styles.cell, styles.rightText, styles.priceCell]}>
                  จำนวนเงิน (ไม่รวมภาษี){" "}
                </Text>
              </View>
              {Array.from({
                length: Math.max(19, cartItems.length),
              }).map((_, index) => {
                const item = cartItems[index];
                return (
                  <View
                    style={index === 18 ? styles.rowLastChild : styles.row}
                    key={index}
                  >
                    <Text style={[styles.cell, styles.centerText]}>
                      {item ? index + 1 : ""}{" "}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        styles.nameCell,
                        (item?.product?.title.length || 0) > 40
                          ? styles.fontSmall
                          : {},
                      ]}
                    >
                      {item?.product?.title || ""}{" "}
                    </Text>
                    <Text style={[styles.cell, styles.centerText]}>
                      {item?.amount || ""}{" "}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        styles.centerText,
                        (item?.product?.price.toString().length ?? 0) > 6
                          ? styles.fontSmall
                          : {},
                      ]}
                    >
                      {item?.product
                        ? priceFormatter(item.product.price)
                        : ""}{" "}
                    </Text>
                    <Text
                      style={[styles.cell, styles.rightText, styles.priceCell]}
                    >
                      {item
                        ? priceFormatter(
                            item.amount * (item.product?.price || 0),
                          )
                        : ""}{" "}
                    </Text>
                  </View>
                );
              })}
            </View>
            {pricesValue.map((priceValue, index) => (
              <View style={styles.priceTable} key={index}>
                <View style={styles.rowLastChild}>
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
                      styles.hiddenRightBorder,
                      styles.centerText,
                      { flex: 3 },
                    ]}
                  />
                  <Text style={[styles.cell, styles.leftText, { flex: 3 }]}>
                    {priceValue.title}{" "}
                  </Text>
                  <Text
                    style={[
                      styles.cell,
                      styles.priceCell,
                      { borderBottom: "1px solid black" },
                      styles.rightText,
                    ]}
                  >
                    {priceValue.value}{" "}
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
            <View style={[styles.outerWrap, { marginTop: "14.5px" }]}>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={styles.signPlaceholder}>ผู้มีอำนาจอนุมัติ </Text>
                <Text style={{ marginLeft: -30, marginTop: 10 }}>
                  วันที่ {"    "}..................... /.....................
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
    </PDFWrapper>
  );
};

export default PDFDocument;
