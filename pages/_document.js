import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            (function(v,i,s,a){if(!v._visaSettings){v._visaSettings={};}v._visaSettings["7d19bd28-efc8-11eb-b589-901b0edac50a"]={v:"0.3",s:"7d19bd28-efc8-11eb-b589-901b0edac50a",a:"1"};_v=i.getElementsByTagName("body")[0];_a=_v;_i=i.createElement("script");_s=_i;_s.defer="defer";_s.src=s+a+v._visaSettings["7d19bd28-efc8-11eb-b589-901b0edac50a"].v;_a.appendChild(_s);})(window,document,"//app-worker.visitor-analytics.io/main",".js?s=7d19bd28-efc8-11eb-b589-901b0edac50a&v=")
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
