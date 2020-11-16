
export const editFilePath = (req, file, callback) => {
    callback(null, `${process.env.FILE_URL}${file.filename}`);
}