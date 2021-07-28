import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(v,i,s,a){if(!v._visaSettings){v._visaSettings={};}v._visaSettings["7d19bd28-efc8-11eb-b589-901b0edac50a"]={v:"0.3",s:"7d19bd28-efc8-11eb-b589-901b0edac50a",a:"1"};_v=i.getElementsByTagName("body")[0];_a=_v;_i=i.createElement("script");_s=_i;_s.defer="defer";_s.src=s+a+v._visaSettings["7d19bd28-efc8-11eb-b589-901b0edac50a"].v;_a.appendChild(_s);})(window,document,"//app-worker.visitor-analytics.io/main",".js?s=7d19bd28-efc8-11eb-b589-901b0edac50a&v=")<!-- VISA Tracking Code for https://juanalvarez.vercel.app/ -->
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
