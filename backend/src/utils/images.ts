import { Request } from "express";

export const getImageUrl = (filename: string, req: Request) => {
    const baseUrl = 'http://localhost:4000/';
    let uploadFolder = '';
    if (req.originalUrl.includes('/profile')) {
      uploadFolder = 'uploads/profiles';
    } else if (req.originalUrl.includes('/view-request')) {
      uploadFolder = 'uploads/documents';
    } else {
      uploadFolder = 'uploads/other';
    }
  
    return `${baseUrl}${uploadFolder}/${filename}`;
  };