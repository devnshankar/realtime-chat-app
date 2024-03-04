import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:3000", { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

// Prop Types validation
SocketProvider.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
};
