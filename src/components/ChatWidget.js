import { useState, useEffect, useRef } from 'react';
import { Bot, Send } from 'lucide-react';
import { Filter } from 'bad-words';
import { useTranslation } from 'react-i18next';

const ChatWidget = () => {
    const { t } = useTranslation();
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

        const estimateTokens = (text) => Math.ceil(text.length / 4);
        const estimated = estimateTokens(input);
        if (estimated > 500) {
            alert(t('chat.too_long'));
            return;
        }

        const filter = new Filter();
        if (filter.isProfane(input)) {
            alert(t('chat.profanity'));
            return;
        }

        const userMsg = { role: 'user', content: input };
        const updatedMessages = [...messages, userMsg];
        setMessages([...updatedMessages, { role: 'assistant', content: '...' }]);
        setInput('');

        try {
            const res = await fetch('/api/chat-personal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageHistory: updatedMessages.slice(-8)
                })
            });

            const data = await res.json();

            setMessages([
                ...updatedMessages,
                { role: 'assistant', content: data.reply }
            ]);
        } catch (err) {
            console.error('Chat API error:', err);
            setMessages([
                ...updatedMessages,
                { role: 'assistant', content: t('chat.error') }
            ]);
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
                <div className="chat-header">{t('chat.header')}</div>
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
                        placeholder={t('chat.placeholder')}
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