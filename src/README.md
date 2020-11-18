How to use:

include the following script in the index.html header section

1.  <script src="DYMO.Label.Framework.3.0.js" type="text/javascript" charset="UTF-8"></script>

2.  prepase label and output it as XML
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

3.  construct data as json, key must match with <Name>Address</Name> in the object

const data = [{ key: "Address", value: "valueeeee" }];
