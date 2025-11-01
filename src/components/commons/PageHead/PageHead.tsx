import Head from "next/head";

interface PropTypes {
  title?: string;
}

const PageHead = (props: PropTypes) => {
  //sebagai title default
  const { title = "Home" } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href="/images/general/2.jpg" />
    </Head>
  );
};

export default PageHead;
