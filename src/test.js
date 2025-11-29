
/*
import { log } from 'console';
import fs from 'fs';

const fileUrl = new URL('./test.json', import.meta.url);

fetch(fileUrl)
  .then((res) => res.json())
  .then((res) => {
    res.data.xdt_api__v1__clips__user__connection_v2.edges.map((edge) => {
      edge.node.media.video_versions.map((e) => {
        const filename = getFilenameFromUrl(String(e.url));
        downloadVideo(e.url, filename);
      });
    });
  })
  .catch((err) => console.error(err));

function getFilenameFromUrl(url) {
  const cleanUrl = url.split('?')[0];
  let filename = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);

  if (!filename.endsWith('.mp4')) {
    filename += '.mp4';
  }

  return `video_${filename}`;
}

async function downloadVideo(url, filename) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filename, Buffer.from(buffer));
  console.log('Download complete:', filename);
}
*/

import fs from "fs";
import path from "path";

const fileUrl = new URL('./test.json', import.meta.url);


fetch(fileUrl)
  .then(res => res.json())
  .then(async res => {
    const imageUrls = res?.data?.xdt_api__v1__clips__user__connection_v2?.edges
      ?.flatMap(edge => edge?.node?.media?.image_versions2?.candidates ?? [])
      ?.map(candidate => candidate.url) ?? [];

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filePath = path.resolve(`image_${i + 1}.jpg`);

      const response = await fetch(url);
      const buffer = await response.arrayBuffer();

      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log(`Downloaded: ${filePath}`);
    }
  })
  .catch(console.error);
