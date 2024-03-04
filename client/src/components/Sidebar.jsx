import PropTypes from "prop-types";
import React from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal"; // Make sure the import path is correct

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeTab, setActiveTab] = React.useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeTab === CONVERSATIONS_KEY;
  const [modalOpen, setModalOpen] = React.useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column border">
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded m-1">
          New {conversationsOpen ? "Conversation" : "Contact"}
        </Button>
        <Button
          className="rounded border-danger bg-danger m-1 mt-0"
          onClick={() => clearLocalStorageWithPrefix("whatsapp-clone-")}
        >
          Clear LocalStorage
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}

// Prop Types validation
Sidebar.propTypes = {
  id: PropTypes.any.isRequired,
};


function clearLocalStorageWithPrefix(prefix) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
      window.location.reload();
    }
  }
}