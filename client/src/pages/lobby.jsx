/* eslint-disable no-unexpected-multiline */
import { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider"
import { useNavigate } from "react-router-dom";

function LobbyScreen() {
  const [email, setEmail] = useState("")
  const [room, setRoom] = useState("")
  const socket = useSocket()
  const navigate = useNavigate()

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit("room:join", { email, room })
    [email, room, socket]
  })
  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    console.log(email)
    navigate(`/room/${room}`)
  }, [navigate])

  useEffect(() => {
    socket.on("join:room", handleJoinRoom)
    return () => {
      socket.off("join:room", handleJoinRoom)
    }
  }, [socket, handleJoinRoom])

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email" >Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor="room">Room Number</label>
        <input type="text" id="room" value={room} onChange={e => setRoom(e.target.value)} />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}

export default LobbyScreen;
