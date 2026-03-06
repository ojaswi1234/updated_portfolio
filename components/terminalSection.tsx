import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

export const TerminalSection = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const term = useRef<Terminal | null>(null);
  const inputBuffer = useRef<string>(''); // Track user input

  useEffect(() => {
    const setupTerminal = async () => {
      const { WebLinksAddon } = await import('@xterm/addon-web-links');

      term.current = new Terminal({
        cursorBlink: true,
        rows: 26,
        cols: 90,
        fontFamily: 'Monaco, Menlo, "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.2,
        letterSpacing: 0,
        theme: {
          background: '#0a0e14',
          foreground: '#00ff00',
          cursor: '#00ff00',
          cursorAccent: '#0a0e14',
          selectionBackground: '#00ff0044',
          black: '#01060e',
          red: '#ea6c73',
          green: '#00ff00',
          yellow: '#ffff00',
          blue: '#53bdfa',
          magenta: '#fae994',
          cyan: '#90e1c6',
          white: '#c7c7c7',
          brightBlack: '#686868',
          brightRed: '#f07178',
          brightGreen: '#00ff00',
          brightYellow: '#ffff00',
          brightBlue: '#59c2ff',
          brightMagenta: '#ffee99',
          brightCyan: '#95e6cb',
          brightWhite: '#ffffff',
        },
      });

      const webLinksAddon = new WebLinksAddon();
      term.current.loadAddon(webLinksAddon);

      if (!terminalRef.current) {
        console.warn("Terminal container not found.");
        return;
      }

      term.current.open(terminalRef.current);
      term.current.focus();

      // Intro Message
      term.current.writeln('');
      term.current.writeln('\x1b[1;32m=======================================================\x1b[0m');
      term.current.writeln('\x1b[1;33m  Ojaswi Bhardwaj\x1b[0m - Portfolio Terminal');
      term.current.writeln('\x1b[1;32m=======================================================\x1b[0m');
      term.current.writeln('');
      term.current.writeln('Welcome! Type \x1b[1;33mhelp\x1b[0m to see available commands.');
      term.current.writeln('GitHub: \x1b[36mhttps://github.com/Ojaswi1234\x1b[0m');
      term.current.writeln('');

      const prompt = () => {
        term.current?.write('\r\n\x1b[1;32mojaswi@portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ');
      };

      prompt();

      term.current.onData((e) => {
        if (!term.current) return;

        switch (e) {
          case '\r': {
            const command = inputBuffer.current.trim();
            term.current.writeln('');

            if (command === '') {
              // No-op
            } else if (command === 'help') {
              term.current.writeln('\x1b[1;33mAvailable Commands:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  \x1b[1;36mabout\x1b[0m       Display information about me');
              term.current.writeln('  \x1b[1;36mresume\x1b[0m      Download my resume (PDF)');
              term.current.writeln('  \x1b[1;36mlinkedin\x1b[0m    Open LinkedIn profile');
              term.current.writeln('  \x1b[1;36mgithub\x1b[0m      Open GitHub profile');
              term.current.writeln('  \x1b[1;36memail\x1b[0m       Display contact email');
              term.current.writeln('  \x1b[1;36mprojects\x1b[0m    List my projects');
              term.current.writeln('  \x1b[1;36mcls\x1b[0m         Clear terminal screen');
              
            } else if (command === 'cls') {
              term.current.clear();

            }else if(command === 'resume'){
              term.current.writeln('\x1b[1;32m✓\x1b[0m Opening resume...');
              window.open('/resume.pdf', '_blank');
            }else if(command === 'linkedin'){
              term.current.writeln('\x1b[1;32m✓\x1b[0m Opening LinkedIn profile...');
              window.open('https://www.linkedin.com/in/ojaswi-bhardwaj-962393281/', '_blank');
            }
            else if(command === 'github'){
              term.current.writeln('\x1b[1;32m✓\x1b[0m Opening GitHub profile...');
              window.open('https://github.com/Ojaswi1234', '_blank');
            }
            else if(command === 'email'){
              term.current.writeln('\x1b[1;33mEmail:\x1b[0m ojaswideep2020@gmail.com');
              term.current.writeln('\x1b[1;32m✓\x1b[0m Opening mail client...');
              window.open('mailto:ojaswideep2020@gmail.com', '_blank');
            }
            else if (command === 'projects') {
              term.current.writeln('\x1b[1;33mMy Projects:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('\x1b[1;36m[1]\x1b[0m \x1b[1mSleepSense\x1b[0m');
              term.current.writeln('    Sleep tracking app for monitoring patterns');
              term.current.writeln('    \x1b[36mhttps://github.com/ojaswi1234/SleepSense\x1b[0m');
              term.current.writeln('');
              term.current.writeln('\x1b[1;36m[2]\x1b[0m \x1b[1mJust Notes\x1b[0m');
              term.current.writeln('    Browser extension for quick note-taking');
              term.current.writeln('    \x1b[36mhttps://github.com/ojaswi1234/JustNotes\x1b[0m');
              term.current.writeln('');
              term.current.writeln('\x1b[1;36m[3]\x1b[0m \x1b[1m2 Player Chess Game\x1b[0m');
              term.current.writeln('    Real-time multiplayer chess with chat');
              term.current.writeln('    \x1b[36mhttps://github.com/ojaswi1234/chessgame_with_chatting\x1b[0m');
              term.current.writeln('');
              term.current.writeln('\x1b[1;36m[4]\x1b[0m \x1b[1mMovie Spot\x1b[0m');
              term.current.writeln('    Movie discovery and recommendation platform');
              term.current.writeln('    \x1b[36mhttps://github.com/ojaswi1234/MovieSpot\x1b[0m');
            }
            else if (command === 'about') {
              term.current.writeln('\x1b[1;33mAbout Me:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('\x1b[1mName:\x1b[0m     Ojaswi Bhardwaj');
              term.current.writeln('\x1b[1mRole:\x1b[0m     Full Stack Developer');
              term.current.writeln('\x1b[1mFocus:\x1b[0m    Building scalable web applications');
              term.current.writeln('');
              term.current.writeln('\x1b[1;33mLinks:\x1b[0m');
              term.current.writeln('  GitHub   : \x1b[36mhttps://github.com/Ojaswi1234\x1b[0m');
              term.current.writeln('  LinkedIn : \x1b[36mhttps://www.linkedin.com/in/ojaswi-bhardwaj-962393281/\x1b[0m');
              term.current.writeln('  Email    : \x1b[36mojaswideep2020@gmail.com\x1b[0m');
            } else {
              term.current.writeln('\x1b[1;31mbash:\x1b[0m \x1b[33m' + command + '\x1b[0m: command not found');
              term.current.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.');
            }

            inputBuffer.current = '';
            prompt();
            break;
          }

          case '\u007F': // Backspace
            if (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              term.current.write('\b \b');
            }
            break;

          default:
            if (e >= ' ' && e <= '~') {
              inputBuffer.current += e;
              term.current.write(e);
            }
        }
      });
    };

    if (terminalRef.current) {
      setupTerminal();
    }

    return () => {
      term.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full bg-[#0a0e14] flex justify-center items-center overflow-hidden"
      
    />
  );
};
