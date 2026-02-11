import { useState, useEffect, useRef } from 'react';

interface UseStreamingTextOptions {
  text: string;
  speed?: number; // milliseconds per character
  onComplete?: () => void;
}

interface UseStreamingTextReturn {
  displayedText: string;
  isTyping: boolean;
}

export const useStreamingText = ({
  text,
  speed = 50,
  onComplete,
}: UseStreamingTextOptions): UseStreamingTextReturn => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset when text changes
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeNextCharacter = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeNextCharacter, speed);
      } else {
        setIsTyping(false);
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Start typing after a brief delay
    timeoutRef.current = setTimeout(typeNextCharacter, speed);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, onComplete]);

  return { displayedText, isTyping };
};
