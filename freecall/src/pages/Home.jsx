import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
     const navigate = useNavigate();
     const [input, setInput] = React.useState("");
     const [copiedRoomId, setCopiedRoomId] = React.useState(false);
     const [expandedFaq, setExpandedFaq] = React.useState(null);
     
     function handleJoin() {
          if (!input.trim()) {
               alert('Please enter a room ID');
               return;
          }
          navigate(`/room/${input}`);
     }

     function handleKeyPress(e) {
          if (e.key === 'Enter') {
               handleJoin();
          }
     }

     function generateRoomId() {
          const roomId = Math.random().toString(36).substr(2, 9);
          setInput(roomId);
     }

     function copyRoomId() {
          if (input) {
               navigator.clipboard.writeText(input);
               setCopiedRoomId(true);
               setTimeout(() => setCopiedRoomId(false), 2000);
          }
     }

     function toggleFaq(index) {
          setExpandedFaq(expandedFaq === index ? null : index);
     }

     const features = [
          { icon: '🎥', title: 'Crystal Clear Video', desc: 'HD quality video calls with optimized compression' },
          { icon: '🎵', title: 'High Quality Audio', desc: 'Crystal clear audio with noise cancellation' },
          { icon: '📱', title: 'Works Everywhere', desc: 'Desktop, tablet, or mobile - seamless experience' },
          { icon: '🔒', title: 'Secure Calls', desc: 'End-to-end encrypted video meetings' }
     ];

     const faqItems = [
          { q: 'How do I start a meeting?', a: 'Click "Create Meeting" to generate a unique room ID, then share it with others.' },
          { q: 'Is FreeCall free?', a: 'Yes! FreeCall is completely free. No subscriptions, no hidden fees.' },
          { q: 'Can I use it on my phone?', a: 'Absolutely! FreeCall works on all devices - phones, tablets, and computers.' },
          { q: 'How many people can join?', a: 'You can have one-on-one calls with FreeCall. Perfect for personal and professional conversations.' }
     ];

     return (
          <div id="home">
               <div className="home-container">
                    <div className="home-header">
                         <h1 className="app-title">FreeCall</h1>
                         <p className="app-subtitle">Connect with anyone, anywhere</p>
                    </div>

                    <div className="home-content">
                         {input && (
                              <div className="generated-room-section">
                                   <h2>Your Meeting ID</h2>
                                   <div className="room-id-display">
                                        <div className="room-id-value">{input}</div>
                                        <button onClick={copyRoomId} className="btn-copy-large">
                                             {copiedRoomId ? '✓ Copied!' : '📋 Copy ID'}
                                        </button>
                                   </div>
                                   <button onClick={handleJoin} className="btn-start-meeting">
                                        🎥 Start Meeting
                                   </button>
                              </div>
                         )}

                         <div className="input-section">
                              <h2>{input ? 'Or join another meeting' : 'Join a meeting'}</h2>
                              <div className="input-wrapper">
                                   <input
                                        type="text"
                                        placeholder='Enter room ID'
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="room-input"
                                   />
                                   <button onClick={handleJoin} className="btn-join">
                                        Join Now
                                   </button>
                              </div>
                         </div>

                         <div className="divider">
                              <span>or</span>
                         </div>

                         <div className="action-section">
                              <h2>Start a new meeting</h2>
                              <button onClick={generateRoomId} className="btn-new-meeting">
                                   + Create Meeting
                              </button>
                         </div>

                         <div className="features-section">
                              <h2>Why Choose FreeCall?</h2>
                              <div className="features-grid">
                                   {features.map((feature, idx) => (
                                        <div key={idx} className="feature-card">
                                             <div className="feature-icon">{feature.icon}</div>
                                             <h3>{feature.title}</h3>
                                             <p>{feature.desc}</p>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         <div className="faq-section">
                              <h2>Frequently Asked Questions</h2>
                              <div className="faq-container">
                                   {faqItems.map((item, idx) => (
                                        <div key={idx} className="faq-item">
                                             <button 
                                                  className="faq-question"
                                                  onClick={() => toggleFaq(idx)}
                                             >
                                                  <span>{item.q}</span>
                                                  <span className={`faq-toggle ${expandedFaq === idx ? 'open' : ''}`}>▼</span>
                                             </button>
                                             {expandedFaq === idx && (
                                                  <div className="faq-answer">
                                                       {item.a}
                                                  </div>
                                             )}
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>

                    <div className="home-footer">
                         <div className="footer-content">
                              <p>&copy; 2025 FreeCall. All rights reserved.</p>
                         </div>
                         <div className="developer-credit">
                              <span>Designed with</span>
                              <span className="heart-icon">❤️</span>
                              <span>by</span>
                              <a href="https://github.com/RitikRai07" target="_blank" rel="noopener noreferrer" className="developer-name">
                                    Drshn
                              </a>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Home
