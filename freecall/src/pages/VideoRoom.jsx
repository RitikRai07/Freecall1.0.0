import React, { useMemo, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './VideoRoom.css';

function generateUserId() {
     return Math.floor(Math.random() * 1000000).toString();
}

function VideoRoom() {
     const { roomID } = useParams();
     const navigate = useNavigate();
     const containerRef = useRef(null);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(null);
     const [callDuration, setCallDuration] = useState(0);
     const [isCallActive, setIsCallActive] = useState(false);

     const userID = useMemo(() => generateUserId(), []);
     const userName = useMemo(() => "user" + userID, [userID]);
     
     // Call timer
     useEffect(() => {
          let interval;
          if (isCallActive) {
               interval = setInterval(() => {
                    setCallDuration(prev => prev + 1);
               }, 1000);
          }
          return () => {
               if (interval) clearInterval(interval);
          };
     }, [isCallActive]);
     
     useEffect(() => {
          // Make video room fullscreen responsive
          const handleResize = () => {
               if (containerRef.current) {
                    containerRef.current.style.width = '100%';
                    containerRef.current.style.height = '100%';
               }
          };

          window.addEventListener('resize', handleResize);
          handleResize();

          return () => window.removeEventListener('resize', handleResize);
     }, []);

     useEffect(() => {
          const initMeeting = async () => {
               try {
                    setIsLoading(true);
                    
                    // Avoid duplicate joins
                    if (containerRef.current?.querySelector('.ZegoContainer')) {
                         setIsLoading(false);
                         setIsCallActive(true);
                         return;
                    }

                    const appID = 700007536;
                    const serverSecret = "db7c9a4750b86721b7e778b2bdc51a4c";
                    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                         appID,
                         serverSecret,
                         roomID,
                         userID,
                         userName
                    );
                    const zp = ZegoUIKitPrebuilt.create(kitToken);
                    zp.joinRoom({
                         container: containerRef.current,
                         sharedLinks: [
                              {
                                   name: 'Personal link',
                                   url: `http://localhost:5174/room/${roomID}`,
                              },
                         ],
                         scenario: {
                              mode: ZegoUIKitPrebuilt.OneONoneCall,
                         },
                    });
                    
                    setIsLoading(false);
                    setIsCallActive(true);
               } catch (err) {
                    console.error('Failed to initialize meeting:', err);
                    setError('Failed to initialize meeting. Please try again.');
                    setIsLoading(false);
               }
          };
          
          if (containerRef.current && roomID && userID) {
               initMeeting();
          }
     }, [roomID, userID, userName]);

     const handleLeaveRoom = () => {
          navigate('/');
     };

     const formatDuration = (seconds) => {
          const hrs = Math.floor(seconds / 3600);
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s`;
     };
     
     return (
          <div className="video-room-wrapper">
               {isLoading && (
                    <div className="loading-container">
                         <div className="loader"></div>
                         <p>Initializing meeting...</p>
                    </div>
               )}
               
               {error && (
                    <div className="error-container">
                         <div className="error-message">
                              <h3>⚠️ Error</h3>
                              <p>{error}</p>
                              <button onClick={handleLeaveRoom} className="btn-error-action">
                                   Return to Home
                              </button>
                         </div>
                    </div>
               )}
               
               <div className="video-room-container">
                    <div ref={containerRef} className="video-container" />
                    
                    <div className="video-controls-overlay">
                         <div className="room-info">
                              <span className="room-badge">📍 Room: {roomID}</span>
                              <span className="user-badge">👤 {userName}</span>
                              {isCallActive && (
                                   <span className="call-duration-badge">⏱️ {formatDuration(callDuration)}</span>
                              )}
                         </div>
                         
                         <button onClick={handleLeaveRoom} className="btn-leave-room">
                              ✕ Leave Room
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default VideoRoom
