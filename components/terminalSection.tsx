import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

interface TerminalSectionProps {
  onClose?: () => void;
}

export const TerminalSection = ({ onClose }: TerminalSectionProps) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const term = useRef<Terminal | null>(null);
  const inputBuffer = useRef<string>(''); // Track user input
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const mountTime = useRef<number>(Date.now());

  useEffect(() => {
    let disposed = false;

    const setupTerminal = async () => {
      const { WebLinksAddon } = await import('@xterm/addon-web-links');

      if (disposed) return;

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

      // Clear any leftover DOM from previous mount (StrictMode double-mount)
      terminalRef.current.innerHTML = '';

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

            if (command !== '') {
              commandHistory.current.push(command);
            }
            historyIndex.current = -1;

            if (command === '') {
              // No-op
            } else if (command === 'help') {
              term.current.writeln('\x1b[1;33mAvailable Commands:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  \x1b[1;36mneofetch\x1b[0m    System info splash card');
              term.current.writeln('  \x1b[1;36mabout\x1b[0m       Display information about me');
              term.current.writeln('  \x1b[1;36mskills\x1b[0m      List technical skills');
              term.current.writeln('  \x1b[1;36mexperience\x1b[0m  Show work experience');
              term.current.writeln('  \x1b[1;36meducation\x1b[0m   Show education background');
              term.current.writeln('  \x1b[1;36mprojects\x1b[0m    List my projects');
              term.current.writeln('  \x1b[1;36mresume\x1b[0m      Download my resume (PDF)');
              term.current.writeln('  \x1b[1;36mlinkedin\x1b[0m    Open LinkedIn profile');
              term.current.writeln('  \x1b[1;36mgithub\x1b[0m      Open GitHub profile');
              term.current.writeln('  \x1b[1;36memail\x1b[0m       Display contact email');
              term.current.writeln('  \x1b[1;36mwhoami\x1b[0m      Who is this?');
              term.current.writeln('  \x1b[1;36mls\x1b[0m          List directory contents');
              term.current.writeln('  \x1b[1;36mcat\x1b[0m         Read a file (try: cat README.md)');
              term.current.writeln('  \x1b[1;36mhistory\x1b[0m     Show command history');
              term.current.writeln('  \x1b[1;36mdate\x1b[0m        Show current date & time');
              term.current.writeln('  \x1b[1;36muptime\x1b[0m      Show terminal session uptime');
              term.current.writeln('  \x1b[1;36mcls\x1b[0m         Clear terminal screen');
              term.current.writeln('  \x1b[1;36mexit\x1b[0m        Close terminal');
              
            } else if (command === 'cls' || command === 'clear') {
              term.current.clear();

            } else if (command === 'exit' || command === 'quit') {
              term.current.writeln('\x1b[1;32m✓\x1b[0m Closing terminal...');
              setTimeout(() => onClose?.(), 300);

            } else if (command === 'neofetch') {
              const art = [
                '\x1b[1;32m        .--.        \x1b[0m',
                '\x1b[1;32m       |o_o |       \x1b[0m',
                '\x1b[1;32m       |:_/ |       \x1b[0m',
                '\x1b[1;32m      //   \\ \\      \x1b[0m',
                '\x1b[1;32m     (|     | )     \x1b[0m',
                '\x1b[1;32m    /\'\\___/\'\\     \x1b[0m',
                '\x1b[1;32m    \\___)=(___/     \x1b[0m',
              ];
              const info = [
                '\x1b[1;33mojaswi\x1b[0m@\x1b[1;33mportfolio\x1b[0m',
                '──────────────────',
                '\x1b[1;36mOS:\x1b[0m      Portfolio/Vite',
                '\x1b[1;36mHost:\x1b[0m    Ojaswi Bhardwaj',
                '\x1b[1;36mRole:\x1b[0m    Full Stack Developer',
                '\x1b[1;36mShell:\x1b[0m   ojaswi-terminal 1.0',
                '\x1b[1;36mTheme:\x1b[0m   Neo-Brutalism',
              ];
              term.current.writeln('');
              for (let i = 0; i < Math.max(art.length, info.length); i++) {
                const left = art[i] || '                    ';
                const right = info[i] || '';
                term.current.writeln(`${left}  ${right}`);
              }
              term.current.writeln('');
              // Color palette row
              term.current.writeln('                      \x1b[40m   \x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[47m   \x1b[0m');

            } else if (command === 'skills') {
              term.current.writeln('\x1b[1;33mTechnical Skills:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  \x1b[1;36mLanguages:\x1b[0m    TypeScript, JavaScript, Python, Java, C++');
              term.current.writeln('  \x1b[1;36mFrontend:\x1b[0m     React, Next.js, Tailwind CSS, Vite');
              term.current.writeln('  \x1b[1;36mBackend:\x1b[0m      Node.js, Express, Spring Boot');
              term.current.writeln('  \x1b[1;36mDatabases:\x1b[0m    MongoDB, PostgreSQL, Redis');
              term.current.writeln('  \x1b[1;36mDevOps:\x1b[0m       Docker, Git, Linux, CI/CD');
              term.current.writeln('  \x1b[1;36mTools:\x1b[0m        VS Code, Postman, Figma');

            } else if (command === 'experience') {
              term.current.writeln('\x1b[1;33mWork Experience:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  \x1b[1;32m●\x1b[0m \x1b[1mSoftware Engineer Trainee\x1b[0m @ Grazitti Interactive');
              term.current.writeln('    \x1b[90mJun 2025 – Nov 2025\x1b[0m');
              term.current.writeln('    \x1b[90mJava, Design Patterns, Unit Testing\x1b[0m');

            } else if (command === 'education') {
              term.current.writeln('\x1b[1;33mEducation:\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  \x1b[1;32m🎓\x1b[0m \x1b[1mB.Tech in Computer Science\x1b[0m');
              term.current.writeln('     Currently pursuing');
              term.current.writeln('     \x1b[90mFocused on web development & software engineering\x1b[0m');

            } else if (command === 'whoami') {
              term.current.writeln('\x1b[1;32mojaswi\x1b[0m — Full Stack Developer, open-source enthusiast,');
              term.current.writeln('and the person who built this terminal you\'re using right now. 🚀');

            } else if (command === 'ls') {
              term.current.writeln('\x1b[1;34mabout.txt\x1b[0m  \x1b[1;34mprojects/\x1b[0m  \x1b[1;34mskills.json\x1b[0m  \x1b[1;34mREADME.md\x1b[0m  \x1b[1;34mresume.pdf\x1b[0m  \x1b[1;34m.secret\x1b[0m');

            } else if (command === 'cat README.md' || command === 'cat readme.md') {
              term.current.writeln('\x1b[1;33m# Ojaswi Bhardwaj — Portfolio\x1b[0m');
              term.current.writeln('');
              term.current.writeln('Welcome to my interactive portfolio terminal!');
              term.current.writeln('Built with \x1b[1;36mReact\x1b[0m + \x1b[1;36mVite\x1b[0m + \x1b[1;36mxterm.js\x1b[0m');
              term.current.writeln('');
              term.current.writeln('Feel free to explore using the commands.');
              term.current.writeln('Type \x1b[1;33mhelp\x1b[0m to get started.');

            } else if (command === 'cat about.txt') {
              term.current.writeln('Hi! I\'m Ojaswi — a full stack developer who loves');
              term.current.writeln('building things that live on the internet.');
              term.current.writeln('When I\'m not coding, you\'ll find me exploring');
              term.current.writeln('new tech, contributing to open source, or gaming.');

            } else if (command === 'cat skills.json') {
              term.current.writeln('\x1b[33m{\x1b[0m');
              term.current.writeln('  \x1b[36m"languages"\x1b[0m: ["TypeScript", "JavaScript", "Python", "Java", "C++", "dart"],');
              term.current.writeln('  \x1b[36m"frontend"\x1b[0m:  ["React", "Next.js", "Tailwind CSS", "Vite", "Flutter"],');
              term.current.writeln('  \x1b[36m"backend"\x1b[0m:   ["Node.js", "Express", "Django", "RESTful/GraphQL API "],');
              term.current.writeln('  \x1b[36m"databases"\x1b[0m: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Flutter Hive", "IndexedDB"],');
              term.current.writeln('  \x1b[36m"devops"\x1b[0m:    ["Docker", "Git", "Linux", "CI/CD"]');
              term.current.writeln('\x1b[33m}\x1b[0m');

            } else if (command === 'cat resume.pdf') {
              term.current.writeln('\x1b[1;31merror:\x1b[0m Binary file. Use \x1b[1;33mresume\x1b[0m command to open instead.');

            } else if (command === 'cat .secret') {
              term.current.writeln('\x1b[1;35m🤫 You found the secret file!\x1b[0m');
              term.current.writeln('');
              term.current.writeln('  "The best code is the code that doesn\'t need to exist."');
              term.current.writeln('');
              term.current.writeln('  ...also, try \x1b[1;33msudo hire me\x1b[0m 😉');

            } else if (command.startsWith('cat ')) {
              const filename = command.slice(4).trim();
              term.current.writeln(`\x1b[1;31mcat:\x1b[0m ${filename}: No such file or directory`);
              term.current.writeln('Try \x1b[1;33mls\x1b[0m to see available files.');

            } else if (command === 'sudo hire me') {
              term.current.writeln('');
              term.current.writeln('\x1b[1;32m[sudo] password for recruiter: \x1b[0m********');
              term.current.writeln('');
              term.current.writeln('\x1b[1;33m  ╔══════════════════════════════════════════╗\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m                                          \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m   \x1b[1;32m✅ HIRE REQUEST APPROVED!\x1b[0m              \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m                                          \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m   Reach out:                             \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m   \x1b[36mojaswideep2020@gmail.com\x1b[0m              \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ║\x1b[0m                                          \x1b[1;33m║\x1b[0m');
              term.current.writeln('\x1b[1;33m  ╚══════════════════════════════════════════╝\x1b[0m');
              term.current.writeln('');

            } else if (command.startsWith('sudo ')) {
              term.current.writeln(`\x1b[1;31m[sudo]\x1b[0m permission denied. Try \x1b[1;33msudo hire me\x1b[0m instead 😏`);

            } else if (command === 'history') {
              if (commandHistory.current.length === 0) {
                term.current.writeln('No commands in history.');
              } else {
                commandHistory.current.forEach((cmd, i) => {
                  term.current!.writeln(`  \x1b[90m${String(i + 1).padStart(4)}\x1b[0m  ${cmd}`);
                });
              }

            } else if (command === 'date') {
              term.current.writeln(new Date().toString());

            } else if (command === 'uptime') {
              const elapsed = Math.floor((Date.now() - mountTime.current) / 1000);
              const mins = Math.floor(elapsed / 60);
              const secs = elapsed % 60;
              term.current.writeln(`Terminal up for \x1b[1;32m${mins}m ${secs}s\x1b[0m`);

            } else if(command === 'resume'){
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

          case '\x1b[A': // Up arrow
            if (commandHistory.current.length > 0) {
              if (historyIndex.current === -1) {
                historyIndex.current = commandHistory.current.length - 1;
              } else if (historyIndex.current > 0) {
                historyIndex.current--;
              }
              // Clear current input
              while (inputBuffer.current.length > 0) {
                term.current.write('\b \b');
                inputBuffer.current = inputBuffer.current.slice(0, -1);
              }
              const prev = commandHistory.current[historyIndex.current];
              inputBuffer.current = prev;
              term.current.write(prev);
            }
            break;

          case '\x1b[B': // Down arrow
            if (historyIndex.current !== -1) {
              // Clear current input
              while (inputBuffer.current.length > 0) {
                term.current.write('\b \b');
                inputBuffer.current = inputBuffer.current.slice(0, -1);
              }
              if (historyIndex.current < commandHistory.current.length - 1) {
                historyIndex.current++;
                const next = commandHistory.current[historyIndex.current];
                inputBuffer.current = next;
                term.current.write(next);
              } else {
                historyIndex.current = -1;
                inputBuffer.current = '';
              }
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
      disposed = true;
      term.current?.dispose();
      term.current = null;
    };
  }, [onClose]);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full bg-[#0a0e14] overflow-hidden  p-5"
      
    />
  );
};
