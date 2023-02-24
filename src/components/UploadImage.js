import { useContext, useState } from "react";
import { Context } from '../context/Context';
import AWS from 'aws-sdk'

function UploadImage() {

    const { user, listImages, toggleError } = useContext(Context)

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    function handleUpload(event) {
        event.preventDefault();
        if (file) {
            AWS.config.update({
                accessKeyId: user.accessKey,
                secretAccessKey: user.secretKey
            })
            const s3 = new AWS.S3({
                params: { Bucket: user.bucketName },
                region: user.region,
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const img = new Image();
                img.src = fileReader.result;
                img.onload = () => {
                    const { width, height } = img;
                    const ratio = height / width;
                    if (file.type === 'image/png' && ratio <= 2 && file.size <= 5242880) {
                        const params = {
                            Body: file,
                            Bucket: user.bucketName,
                            Key: fileName
                        };
                        s3.putObject(params, (err, data) => {
                            if (err) {
                                toggleError(true)
                            } else {
                                listImages()
                            }
                        })
                    }
                }
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand">S3 Images</span>
                <div className="navbar-nav">
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleUpload}>
                        <input className="form-control mr-sm-2" type="file" onChange={handleFileChange} />
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default UploadImage