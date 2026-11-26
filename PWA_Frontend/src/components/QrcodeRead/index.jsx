import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import styles from "./styles.module.scss";

function QrcodeRead({ setDataLogin }) {
  const [data, setData] = useState("No result");

  return (
    <div className={styles.qrCodeReader}>
      <Scanner
        onScan={(results) => {
          const result = results[0];
          // o QrcodeCreate usa encodeURI, por isso é preciso descodificar
          const newResult = decodeURI(result.rawValue).split("&&");
          const data = {
            name: newResult[0],
            password: newResult[1],
            isQrCode: true,
          };
          setData(data);
          setDataLogin(data);
        }}
        onError={(error) => console.log(error?.message)}
        constraints={{
          facingMode: "user",
        }}
        scanDelay={300}
      />
      <p>{data.name}</p>
    </div>
  );
}

export default QrcodeRead;
