# Windows 7 compatibility work

This branch is an experimental compatibility track. It does not yet produce a verified Windows 7 installer.

## Changes currently applied

- `src/main/mediaControls.ts`: detect Windows NT 6.1 and skip the Windows Runtime System Media Transport Controls addon. The app registers the existing no-op IPC handlers so the absence of SMTC does not prevent the main player UI from starting.
- `package.json`: pins Electron to 22.3.27, Tailwind CSS to 3.4.17, and `music-metadata` to 10.0.0 because the current 12.x line requires Node.js 22 while Electron 22 embeds Node.js 16; removes the Tailwind 4 Vite plugin and adds PostCSS nesting for the legacy stylesheet pipeline.
- `src/renderer/style.css`, `tailwind.config.cjs`, `postcss.config.cjs`: replaces Tailwind 4 entry/theme syntax with Tailwind 3 directives, class-based dark mode, and explicit theme color mappings. Visual parity and all remaining CSS features still require browser testing.
- `vite.config.mts`: adds an opt-in `ECHOMUSIC_WIN7=1` build target. Renderer output targets Chromium 108; Electron main/preload output targets Node.js 16. This is only a transpilation target, not proof that the full app runs on Windows 7.
- `.github/workflows/win7-renderer-build.yml`: regenerates the pnpm lockfile on CI, runs type-check and a Chromium 108 / Node 16 bundle build, then uploads build bundles.
- `.github/workflows/win7-native-check.yml`: uses a nightly Rust toolchain with `rust-src` and the `x86_64-win7-windows-msvc` target via `-Z build-std`, rather than the normal `x86_64-pc-windows-msvc` target whose minimum OS is Windows 10.

## Confirmed blockers before a usable Windows 7 build

1. The current application pins Electron 43.7.6. Windows 7 requires the legacy Electron 22 line (Chromium 108 / Node.js 16). Electron 22 is end-of-life and should be treated as a legacy/offline-risk runtime.
2. The current CSS uses Tailwind CSS 4.3. Tailwind 4 targets newer browser engines than Chromium 108. The CSS pipeline must be migrated to Tailwind 3.4 or otherwise made Chromium-108 compatible; setting a JavaScript build target does not solve this.
3. The Rust addon manifests have now been lowered from N-API 9 to N-API 8 across the eight native crates. This removes the known Node-API level mismatch for Electron 22's Node.js 16 runtime, but the code still needs to compile against N-API 8, every addon must be rebuilt for Windows x64, and each binary must be loaded in Electron 22. N-API 8 is only the ABI floor; it does not prove that the rest of the Rust or OS dependencies support Windows 7.
4. Windows native integrations need OS gating or legacy alternatives. SMTC is now skipped on Windows 7. Taskbar/DWM integrations, audio capture, and other WinRT/Windows 10+ calls still require audit and runtime testing.
5. The pnpm lockfile must be regenerated from the Electron 22 / Tailwind 3.4 / `music-metadata` 10 manifest, then the CI type-check and bundle build must pass. The application dependencies and runtime APIs still need a Node.js 16 audit.
6. Rust 1.78+ standard Windows MSVC targets use a Windows 10 baseline. The native modules must be built with the special `x86_64-win7-windows-msvc` target; it is Tier 3 and requires a custom/nightly build-std toolchain. A successful ordinary Windows MSVC build would not prove Windows 7 compatibility.

## Required verification before calling this usable

- Install and launch on a clean Windows 7 SP1 x64 machine.
- Verify Kugou API access, search, song details, audio playback, pause/resume, seek, volume, playlist, lyrics, favorites/login where available.
- Verify graceful fallback for unsupported OS integrations.
- Confirm native addons were compiled for `x86_64-win7-windows-msvc`, not `x86_64-pc-windows-msvc`.
- Verify installer launch/uninstall and required Windows servicing / Visual C++ runtime prerequisites.
- Record test results and publish an installer only after those checks pass.

## Safety note

Windows 7 and Electron 22 are unsupported legacy software. Do not use this build for sensitive accounts or sensitive data. Prefer a supported Windows version whenever possible.
