import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";
import { getChatData } from "../../utils/requests";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import styled from "@emotion/styled";
import { db } from "../Auth/Auth";
import { useNavigate } from "react-router";

type Participants = {
  displayName: string;
  uid: string;
  photoURL: string;
};

const Container = styled.div({
  maxWidth: "300px",
  maxHeight: "30vh",
});

export const ChatList = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<DocumentData>();

  const user = useContext(UserContext);

  const { uid } = user;

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    const unsub = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.chats;
      setChats(data);
    });

    return () => unsub();
  }, []);

  return (
    <Container>
      <div>
        <h1 className="groups-title">
          {/* <ExpandMoreIcon />  */}
          CHATS
        </h1>
        <ul>
          {chats &&
            Object.entries(chats).map(([chatId, participants]) => (
              <li key={chatId} onClick={() => navigate(`/chats/${chatId}`)}>
                {participants.participants.displayName}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div className="group-members-container">
          {/* <p style={{ marginLeft: "10px" }}>{eventName.toUpperCase()}</p> */}
          <div className="group-members"></div>
        </div>
      </div>
    </Container>
  );
};
