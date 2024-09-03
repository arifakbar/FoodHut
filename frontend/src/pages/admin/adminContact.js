import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Spin } from "antd";

import AdminSideNav from "../../components/adminSideNav";
import { getContacts, deleteContact } from "../../functions/contact";

function AdminContacts(props) {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { user } = props;

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await getContacts(user.token);
      setContacts(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (c) => {
    if (window.confirm(`Do you really want to remove ${c.name} contact? `)) {
      try {
        setLoading(true);
        await deleteContact(user.token, c._id);
        toast.success(`${c.name} deleted successfully.`);
        loadContacts();
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className>
      <AdminSideNav />
      {loading ? (
        <div className="center-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="d-flex flex-column align-items-center"
          style={{ gap: "15px" }}
        >
          <h2 className="my-2">Contacts</h2>
          <div className="row p-2" style={{ width: "80%" }}>
            {contacts.length > 0 &&
              contacts.map((c) => {
                return (
                  <div className=" col-sm-3" key={c._id}>
                    <div className="border p-2">
                      <p>Name: {c.name}</p>
                      <p>Email: {c.email}</p>
                      <p>Subject: {c.subject}</p>
                      <p>Message: {c.message}</p>
                      <button
                        className="btn btn-raised btn-danger mt-3"
                        onClick={(e) => handleDelete(c)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(AdminContacts);
