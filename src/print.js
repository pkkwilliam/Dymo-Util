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
    if (printer.printerType == "LabelWriterPrinter") {
      printerName = printer.name;
      break;
    }
  }
  const labelSet = new dymo.label.framework.LabelSetBuilder();
  data.forEach(({ key, value }) => labelSet.addRecord().setText(key, value));
  label.printAndPollStatus(
    printerName,
    null,
    labelSet.toString(),
    (printJob, jobStatus) => console.log(jobStatus)
  );
}
