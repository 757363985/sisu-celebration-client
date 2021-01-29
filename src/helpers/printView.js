export default function printView(idstr) {
  var el = document.getElementById(idstr);

  var iframe = document.createElement('IFRAME');
  var doc = null;
  iframe.setAttribute(
    'style',
    'position:absolute;width:1000px;height:1000px;left:-500px;top:-500px;',
  );
  document.body.appendChild(iframe);
  doc = iframe.contentWindow.document;
  doc.write('<div>' + el.innerHTML + '</div>');
  doc.close();
  console.log(doc);
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  if (navigator.userAgent.indexOf('MSIE') > 0) {
    document.body.removeChild(iframe);
  }
}
