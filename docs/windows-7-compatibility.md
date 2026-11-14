# Windows 7 compatibility work

This branch is an experimental compatibility track. It does not yet produce a verified Windows 7 installer.

## Changes currently applied

- `src/main/mediaControls.ts`: detect Windows NT 6.1 and skip the Windows Runtime System Media Transport Controls addon. The app registers the existing no-op IPC handlers so the absence of SMTC does not prevent the main player UI from starting.
- `vite.config.mts`: adds an opt-in `ECHOMUSIC_WIN7=1` build target. Renderer output targets Chromium 108; Electron main/preload output targets Node.js 16. This is only a transpilation target, not proof that the current dependencies or CSS are compatible.

## Confirmed blockers before a usable Windows 7 build

1. The current application pins Electron 43.7.6. Windows 7 requires the legacy Electron 22 line (Chromium 108 / Node.js 16). Electron 22 is end-of-life and should be treated as a legacy/offline-risk runtime.
2. The current CSS uses Tailwind CSS 4.3. Tailwind 4 targets newer browser engines than Chromium 108. The CSS pipeline must be migrated to Tailwind 3.4 or otherwise made Chromium-108 compatible; setting a JavaScript build target does not solve this.
3. The Rust N-API addons currently enable N-API 9. Electron 22's Node.js 16 runtime supports N-API 8. Each addon must be audited for N-API 9-only APIs, changed to an N-API 8-compatible surface, rebuilt for Windows x64, and loaded in Electron 22.
4. Windows native integrations need OS gating or legacy alternatives. SMTC is now skipped on Windows 7. Taskbar/DWM integrations, audio capture, and other WinRT/Windows 10+ calls still require audit and runtime testing.
5. The current lockfile and dependency tree must be checked for packages requiring Node.js 18/20/22 or newer browser APIs. Downgrading Electron alone is not sufficient.

## Required verification before calling this usable

- Install and launch on a clean Windows 7 SP1 x64 machine.
- Verify Kugou API access, search, song details, audio playback, pause/resume, seek, volume, playlist, lyrics, favorites/login where available.
- Verify graceful fallback for unsupported OS integrations.
- Verify installer launch/uninstall and required Windows servicing / Visual C++ runtime prerequisites.
- Record test results and publish an installer only after those checks pass.

## Safety note

Windows 7 and Electron 22 are unsupported legacy software. Do not use this build for sensitive accounts or sensitive data. Prefer a supported Windows version whenever possible.
