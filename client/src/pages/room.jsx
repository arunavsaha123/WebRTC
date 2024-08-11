import { useEffect, useCallback, useState } from "react"
import { useSocket } from "../context/SocketProvider"
import ReactPlayer from "react-player"

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [myStream, setMyStream] = useState()
    const handleUserJoined = useCallback(data => {
        console.log(`Email ${data.email} joined room`);
        setRemoteSocketId(data.id)
    }, []);
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMyStream(stream)
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
            {
                remoteSocketId && <button onClick={handleCallUser}>Call</button>
            }
            {myStream && <ReactPlayer playing height="500px" width="500px" url={myStream}/>}
        </div>
    )
}
export default RoomPage;