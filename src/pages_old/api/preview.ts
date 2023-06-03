import createClient from "@/prismic";
import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import { NextApiRequest, NextApiResponse } from "next";

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient({ req });

  await setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};

export default preview;
