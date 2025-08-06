import { useState, useEffect, useRef } from 'react';
import { Bot, Send } from 'lucide-react';
import { Filter } from 'bad-words';

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const chatRef = useRef(null);
    const toggleRef = useRef(null);
    const chatBodyRef = useRef(null);

    const toggleChat = () => setOpen(!open);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                chatRef.current &&
                !chatRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Filter out long inputs (Max input token: 500)
        const estimateTokens = (text) => Math.ceil(text.length / 4);
        const estimated = estimateTokens(input);
        if (estimated > 500) {
            alert("Too many tokens. Please shorten your message.");
            return;
        }

        // Filter out bad words
        const filter = new Filter();
        if (filter.isProfane(input)) {
            alert("Please keep it respectful.");
            return;
        }

        const userMsg = { role: 'user', content: input };
        const updatedMessages = [...messages, userMsg];

        // Show typing indicator
        setMessages([...updatedMessages, { role: 'assistant', content: '...' }]);
        setInput('');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageHistory: updatedMessages.slice(-8) // Keep conversation short to limit tokens
                })
            });

            const data = await res.json();

            // Replace '...' with real reply
            setMessages([
                ...updatedMessages,
                { role: 'assistant', content: data.reply }
            ]);
        } catch (err) {
            setMessages([...updatedMessages, { role: 'assistant', content: '⚠️ Something went wrong.' }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <>
            <div className="chat-toggle" ref={toggleRef} onClick={toggleChat}>
                <Bot size={28} color="white" />
            </div>

            <div className={`chat-box ${open ? 'open' : ''}`} ref={chatRef}>
                <div className="chat-header">AI Assistant</div>
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="chat-input-wrapper">
                    <input
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about Charles..."
                    />
                    <button className="send-button" onClick={sendMessage}>
                        <Send size={18} color="black" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatWidget;