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
function printLabel(labelXml, data) {
  const label = dymo.label.framework.openLabelXml(labelXml);
  const printers = dymo.label.framework.getPrinters();

  let printerName = "";
  for (let i = 0; i < printers.length; ++i) {
    let printer = printers[i];
    if (printer.printerType === "LabelWriterPrinter" && printer.isConnected) {
      printerName = printer.name;
      break;
    }
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
    (job, jobStatus) => console.log(jobStatus)
  );
}

export default printLabel;
