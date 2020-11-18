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
export function printLabel(labelXml, data) {
  const script = document.createElement("script");
  script.src = "./DYMO.Label.Framework.3.0";
  const label = dymo.label.framework.openLabelXml(labelXml);
  const printers = dymo.label.framework.getPrinters();
  var printerName = "";
  for (var i = 0; i < printers.length; ++i) {
    var printer = printers[i];
    if (printer.printerType == "LabelWriterPrinter") {
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
    (printJob, jobStatus) => console.log(jobStatus)
  );
}

function getAddressLabelXml() {
  var labelXml =
    '<?xml version="1.0" encoding="utf-8"?>\
                            <DieCutLabel Version="8.0" Units="twips">\
                                <PaperOrientation>Landscape</PaperOrientation>\
                                <Id>Address</Id>\
                                <PaperName>30252 Address</PaperName>\
                                <DrawCommands>\
                                    <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
                                </DrawCommands>\
                                <ObjectInfo>\
                                    <AddressObject>\
                                        <Name>Address</Name>\
                                        <LineFonts/>\
                                    </AddressObject>\
                                    <Bounds X="332" Y="150" Width="4455" Height="1260" />\
                                </ObjectInfo>\
                            </DieCutLabel>';
  return labelXml;
}

const data = [{ key: "Address", value: "valueeeee" }];

function printThis() {
  console.log("嘿嘿");
  printLabel(getAddressLabelXml(), data);
}
