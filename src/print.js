// must include this in the index.html header, add DYMO.Label.Framework.3.0.js in same path as index file

{
  /* <title>React App</title>
<script
  src="DYMO.Label.Framework.3.0.js"
  type="text/javascript"
  charset="UTF-8"
></script> */
}

export default class DymoPrintingUtil {
  print(label) {
    var printerName = "";
    for (var i = 0; i < printers.length; ++i) {
      var printer = printers[i];
      console.log(printer.name);
      if (printer.printerType == "LabelWriterPrinter") {
        printerName = printer.name;
        break;
      }
    }
    label.print(printerName);
  }
}
