import { NextApiHandler } from "next";
import { CARD_IMAGE_MAP } from "constant/image";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  const image = CARD_IMAGE_MAP[id as "0"];
  if (!image) {
    return res
      .status(404)
      .json({ status: 404, message: "The requested URL was not found" });
  }
  const imageTemplate = {
    name: `Bullcuan ${Number(id) + 1}`,
    description: `NFT Bullcuan ${Number(id) + 1}`,
    external_url: `https://bullcuan.com/api/nft/${id}`,
    image: image,
  };

  return res.status(200).json(imageTemplate);
};

export default handler;
