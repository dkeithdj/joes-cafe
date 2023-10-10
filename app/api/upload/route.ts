import formidable from "formidable";
import { SaveAll } from "lucide-react";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
export const POST = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    await readFile(req, true);
    NextResponse.json({ done: "ok" });
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }
};
