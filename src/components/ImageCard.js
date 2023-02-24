import React, { useContext } from 'react'
import AWS from 'aws-sdk'
import { Context } from '../context/Context';

const ImageCard = ({ image }) => {

    const { user, listImages, toggleError } = useContext(Context)

    const deleteImage = (image) => {
        AWS.config.update({
            accessKeyId: user.accessKey,
            secretAccessKey: user.secretKey
        })
        const s3 = new AWS.S3({
            params: { Bucket: user.bucketName },
            region: user.region,
        })
        s3.deleteObject({
            Bucket: user.bucketName,
            Key: image.Key
        }, (err, data) => {
            if (err) {
                toggleError(true)
            } else {
                listImages()
            }
        })
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={image.Key}>
            <div className="card">
                <img className="card-img-top" src={`https://${user.bucketName}.s3.amazonaws.com/${image.Key}`} alt={image.Key} />
                <div className="card-body">
                    <p className="card-text">{image.Key}</p>
                    <button className="btn btn-danger" onClick={() => deleteImage(image)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ImageCard