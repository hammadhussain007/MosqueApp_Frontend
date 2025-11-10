This repository is a small React Native + Expo starter app focused on authentication flows (start, login, register, reset, home).
```markdown
This repository is a small React Native + Expo app that implements simple authentication flows (Start, Login, Register, Reset, Home).

Quick orientation (big picture)
- Entry point: `App.jsx` — sets up react-native-paper `Provider`, react-navigation Stack, and registers these routes: `StartScreen`, `LoginScreen`, `RegisterScreen`, `MainTabs`, `ResetPasswordScreen`.
- Screens: re-exported from `app/screens/index.js` (each screen is a default export file, e.g. `app/screens/LoginScreen.js`). Do not rename exports without updating the index and navigator.
- UI & theme: uses `react-native-paper` theme in `app/core/theme.js`. Components read colors via `theme.colors.primary`, `secondary`, `error`.
- Shared components: `app/components/*` contains reusable primitives (notably `TextInput.js` — accepts `errorText` and `description` props and returns strings for validators).

Project-specific patterns and conventions
- Screens are default-exported and must be re-exported in `app/screens/index.js`. Navigator in `App.jsx` references the names there.
- Reusable inputs follow this contract: components accept `errorText` (string) and `description` (string). Validators in `app/helpers/*` return '' when valid and a message string when invalid (see `emailValidator.js`).
- Styling pattern: inline `StyleSheet.create` within component files (follow existing style organization).
- Keep `screenOptions={{ headerShown: false }}` unless a screen explicitly needs a header — changing this is deliberate and global in `App.jsx`.

Developer workflows & important commands
- Install deps: yarn recommended; npm also works. Typical commands:
	- yarn install
	- npm install
- Start app / dev server (Expo):
	- npx expo start
	- npm run start  (maps to `expo start`)
	- npm run android / ios / web (open on a simulator/device)
- Do not change `main` in `package.json` (currently `expo/AppEntry.js`) unless you understand Expo entry conventions.

Integration points and dependencies to watch
- Navigation: `@react-navigation/native` + `@react-navigation/stack` + `@react-navigation/bottom-tabs` — changes to versions may require code changes in `App.jsx` and `app/screens/*`.
- UI: `react-native-paper` — theme and Paper components are used widely (see `TextInput.js`). Keep theme shape stable (`theme.colors.*`).
- Forms: `react-hook-form` + `yup` are present. New forms should follow `react-hook-form` patterns used elsewhere.

Files to inspect for examples
- `App.jsx` — navigation setup and route names.
- `app/screens/index.js` — how screens are exported.
- `app/components/TextInput.js` — shared input contract (`errorText`, `description`).
- `app/core/theme.js` — theme object and colors.
- `app/helpers/emailValidator.js`, `passwordValidator.js`, `nameValidator.js` — validator return values and messages.

If anything is unclear (local Expo/CLI versions, preferred package manager, or device targets), ask and I'll adapt guidance.

``` 
If you'd like, I can expand this into a short `AGENT.md` with automated tests or a quick checklist for PR reviewers.
