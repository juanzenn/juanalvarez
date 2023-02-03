import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import createClient from "../../prismic";

export default async (req, res) => {
  const client = createClient({ req });

  setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};
