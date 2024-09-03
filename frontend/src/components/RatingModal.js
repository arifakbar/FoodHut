import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { toast } from "react-toastify";
import history from "../history";

function RatingModal(props) {
  const { children, user, productId } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${productId}` },
      });
    }
  };

  return (
    <>
      <div className="btn btn-danger btn-sm py-2" onClick={() => handleModal()}>
        {user ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave Your Rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your rating. It will appear soon.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(RatingModal);
