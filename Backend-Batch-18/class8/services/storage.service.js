import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: "private_o+5DNQNsWQifRj0AcN8cjqd4Z9U="
});

async function uploadFile(buffer){
    const response = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: 'image.jpg',
      });
      return response
}
export default uploadFile