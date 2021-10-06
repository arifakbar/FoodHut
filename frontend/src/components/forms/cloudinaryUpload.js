import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { connect } from "react-redux";
import { Spin, Avatar, Badge } from "antd";
import { toast } from "react-toastify";

function CloudinaryUpload({ images, setImages, user }) {
  const [loading, setLoading] = useState(false);
  const FileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "jpeg",
          100,
          0,
          (uri) => {
            return axios
              .post(
                process.env.REACT_APP_API + "/uploadImages",
                {
                  image: uri,
                },
                {
                  headers: {
                    authToken: user.token,
                  },
                }
              )
              .then((res) => {
                allUploadedFiles.push(res.data);
                setImages(allUploadedFiles);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.message);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleDeleteImage = (id) => {
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API + "/deleteImages",
        { public_id: id },
        {
          headers: {
            authToken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((i) => i.public_id !== id);
        setImages(filteredImages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <>
      {loading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <label className="btn btn-danger btn-raised">
            Choose Images
            <input
              type="file"
              hidden
              accept="images/*"
              onChange={FileUploadAndResize}
            />
          </label>
          <br />
          <br />
          {images.length > 0 &&
            images.map((i) => {
              return (
                <Badge
                  count="X"
                  key={i.public_id}
                  onClick={() => handleDeleteImage(i.public_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    size={100}
                    src={i.url}
                    shape="square"
                    className="m-3"
                  />
                </Badge>
              );
            })}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(CloudinaryUpload);
