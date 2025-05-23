'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface ShortcutContextProps {
  show: boolean;
  open: () => void;
  close: () => void;
}

const ShortcutContext = createContext<ShortcutContextProps>({
  show: false,
  open: () => {},
  close: () => {},
});

export function ShortcutProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === '?') {
        e.preventDefault();
        setShow(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <ShortcutContext.Provider value={{ show, open, close }}>
      {children}
      {show && <ShortcutModal />}
    </ShortcutContext.Provider>
  );
}

export default function ShortcutModalProvider({ children }: { children: ReactNode }) {
  return <ShortcutProvider>{children}</ShortcutProvider>;
}

function ShortcutModal() {
  const { close } = useContext(ShortcutContext);
  return (
    <div role="dialog" aria-modal="true" className="shortcut-modal">
      <div className="shortcut-content">
        <h2>Keyboard Shortcuts</h2>
        <ul>
          <li><code>Shift + ?</code>: Toggle help</li>
          <li><code>Tab</code>: Navigate elements</li>
          <li><code>L</code>: Toggle theme</li>
          {/* add more */}
        </ul>
        <button onClick={close} aria-label="Close shortcuts">Close</button>
      </div>
    </div>
  );
}