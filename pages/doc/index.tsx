import React from 'react';
// doc-viewer
import DocViewer, {DocRenderer} from 'react-doc-viewer';

function Doc() {
  const docs = [
    // {
    //   uri: require('lib/sample.html'),
    // },
    {
      uri: 'https://raw.githubusercontent.com/soulpage/image-assets/master/sample.html',
    },
  ];

  const CustomHtMLRenderer: DocRenderer = ({mainState: {currentDocument}}) => {
    if (!currentDocument) return null;

    React.useEffect(() => {
      const b64String = currentDocument?.fileData as string;
      const bodyBase64 = b64String?.replace('data:text/html;base64,', '') || '';
      const enc = window.btoa(bodyBase64);

      const body: string = window.atob(enc);

      const iframeCont = document.getElementById('html-body') as HTMLIFrameElement | null;
      const iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
      if (!iframe) return;

      const iframeDoc = iframe.document;
      iframeDoc.open();
      iframeDoc.write(`${body}`);
      iframeDoc.close();
    }, []);
    return (
      <div id="html-renderer">
        <iframe
          id="html-body"
          sandbox="allow-same-origin"
          name="iframe_a"
          title="Iframe Example"
        ></iframe>
      </div>
    );
  };
  CustomHtMLRenderer.fileTypes = ['htm', 'html', 'text/htm', 'text/html', 'text/plain'];
  CustomHtMLRenderer.weight = 1;
  CustomHtMLRenderer.fileLoader = ({documentURI, signal, fileLoaderComplete}) => {
    return fetch(documentURI, {signal})
      .then(async (res) => {
        const blob = await res.blob();

        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', () => fileLoaderComplete(fileReader));
        fileReader.readAsText(blob);
      })
      .catch((e) => {
        return e;
      });
  };
  const handleClick = () => {
    // console.log(document.getElementById('head'));
    // document.getElementById('head').style.color = 'blue';
    // alert('hello');
  };

  return (
    <div>
      <DocViewer
        pluginRenderers={[CustomHtMLRenderer]}
        documents={docs}
        theme={{
          primary: '#5296d8',
          secondary: '#ffffff',
          tertiary: '#5296d899',
          text_primary: '#ffffff',
          text_secondary: '#5296d8',
          text_tertiary: '#00000099',
          disableThemeScrollbar: false,
        }}
      />
      <div>
        <h1 onClick={handleClick}>This is a Heading</h1>
        <p>This is a paragraph.</p>
      </div>
    </div>
  );
}
export default Doc;
