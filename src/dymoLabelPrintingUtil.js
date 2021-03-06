// must include this in the index.html header, add DYMO.Label.Framework.3.0.js in same path as index file

// {
//   /* <title>React App</title>
// <script
//   src="DYMO.Label.Framework.3.0.js"
//   type="text/javascript"
//   charset="UTF-8"
// ></script> */
// }

/**
 *
 * @param {XML} label
 * @param {[{key, value}]} data
 */
export function getAvailablePrinterNames() {
  const printers = dymo.label.framework.getPrinters();
  const availablePrinters = printers.filter(
    (printer) =>
      printer.printerType === "LabelWriterPrinter" && printer.isConnected
  );
  return availablePrinters.map((printer) => printer.name);
}

function printLabel(labelXml, data, printerName = "") {
  const label = dymo.label.framework.openLabelXml(labelXml);
  printerName = printerName ? printerName : getAvailablePrinterNames()[0];
  if (!printerName) {
    return false;
  }
  // record indicate a new label
  // inside each record, we can setText()...
  let labelSet = new dymo.label.framework.LabelSetBuilder();
  let record = labelSet.addRecord();
  data.forEach(({ key, value }) => record.setText(key, value));
  label.printAndPollStatus(
    printerName,
    null,
    labelSet.toString(),
    (job, jobStatus) => {
      if (jobStatus.status !== 0) {
        return false;
      }
    }
  );
  return true;
}

export default printLabel;
