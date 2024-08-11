import { useEffect, useCallback, useState } from "react"
import { useSocket } from "../context/SocketProvider"

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const handleUserJoined = useCallback(data => {
        console.log(`Email ${data.email} joined room`);
        setRemoteSocketId(data.id)
    }, [])
    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        return () => {
            socket.off('user:joined', handleUserJoined);
        }
    }, [socket, handleUserJoined])


    return (
        <div>
            <h1>room page</h1>
            <h4>{remoteSocketId ? 'Connected' : 'NO one in room'}</h4>
        </div>
    )
}
export default RoomPage;