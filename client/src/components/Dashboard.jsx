import PropTypes from "prop-types"; // Import PropTypes from 'prop-types'
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

import { useConversations } from "../contexts/ConversationsProvider";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh"}}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}

// Prop Types validation
Dashboard.propTypes = {
  id: PropTypes.any.isRequired,
};
