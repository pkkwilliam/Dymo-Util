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
 * @param [{key, value}] data
 */
function printLabel(labelXml, data) {
  const label = dymo.label.framework.openLabelXml(labelXml);
  const printers = dymo.label.framework.getPrinters();

  var printerName = "";
  for (var i = 0; i < printers.length; ++i) {
    var printer = printers[i];
    if (printer.printerType === "LabelWriterPrinter") {
      printerName = printer.name;
      break;
    }
  }

  var labelSet = new dymo.label.framework.LabelSetBuilder();
  data.forEach(({ key, value }) => labelSet.addRecord().setText(key, value));
  label.printAndPollStatus(
    printerName,
    null,
    labelSet.toString(),
    (job, jobStatus) => console.log(jobStatus)
  );
}

export default printLabel;
