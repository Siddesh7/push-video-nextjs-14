// pages/index.js
import React, {useRef, useEffect} from "react";
import {
  IoMicOffOutline,
  IoMicSharp,
  IoVideocamOffSharp,
  IoVideocamOutline,
} from "react-icons/io5";
import {ImPhoneHangUp} from "react-icons/im";
type VideoPlayerPropsType = {
  data: any;
  endCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
};
const VideoPlayer: React.FC<VideoPlayerPropsType> = ({
  data,
  endCall,
  toggleAudio,
  toggleVideo,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && data?.local?.stream) {
      localVideoRef.current.srcObject = data?.local?.stream;
    }
    if (remoteVideoRef.current && data?.incoming[0]?.stream) {
      remoteVideoRef.current.srcObject = data?.incoming[0]?.stream;
    }
  }, [data?.local?.stream, data?.incoming[0]?.stream]);

  return (
    <div className="flex flex-col items-center mt-[60px] h-screen p-4">
      <div className="flex flex-row justify-between gap-4">
        {/* Local Video Container */}
        <div className="bg-black w-full md:w-[40vw] h-[60vh] mb-4 rounded-xl overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Remote Video Container */}
        <div className="bg-black w-full md:w-[40vw] h-[60vh] mb-4 rounded-xl overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Controls Container */}
      <div className="flex justify-around items-center mt-4 w-full md:w-1/2 lg:w-1/3">
        <button
          className="btn btn-outline btn-info"
          disabled={!data.incoming[0]}
          onClick={toggleAudio}
        >
          {!data.local.audio ? (
            <IoMicOffOutline size={"20px"} />
          ) : (
            <IoMicSharp size={"20px"} />
          )}
        </button>
        <button
          className="btn btn-outline btn-info"
          disabled={!data.incoming[0]}
          onClick={toggleVideo}
        >
          {data.local.video ? (
            <IoVideocamOutline size={"20px"} />
          ) : (
            <IoVideocamOffSharp size={"20px"} />
          )}
        </button>

        <button
          className="btn btn-outline btn-error"
          onClick={endCall}
          disabled={!data?.incoming[0]?.address}
        >
          <ImPhoneHangUp size={"20px"} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
