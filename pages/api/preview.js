import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import createClient from "../../prismic";

const preview = async (req, res) => {
  const client = createClient({ req });

  setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};

export default preview;
