# Sovereign Notes

每日工作总结助手 - A desktop application for tracking daily work summaries.

## Features

- **Four Categories**: Todo items, Completed tasks, Identified issues, and Blockers
- **Priority & Severity**: Set priority (high/medium/low) for todos and severity for issues
- **Category Management**: Organize todos and issues into custom categories
- **Due Date**: Set due dates for todo items with a date picker
- **Drag & Drop**: Reorder items within each category
- **History View**: Browse and review past daily summaries
- **Data Import/Export**: Export and import data in JSON format (includes categories)
- **Auto Carry-forward**: Uncompleted todos, issues, and blockers from the previous day automatically carry over to today
- **Source Tracking**: Track whether completed items came from todos or issues

## Tech Stack

- Electron
- Vue 3 + Vite
- TypeScript
- Tailwind CSS

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for Windows
npm run build

# Build for macOS (requires macOS)
npm run build:mac
```

## Build Outputs

- Windows: `.exe` installer and portable version
- macOS: `.dmg` and `.zip` (via GitHub Actions)

## Data Storage

Data is stored in the browser's localStorage. On Windows, the data is stored in:
- `%APPDATA%/daily-requester/` (for older versions named "每日工作总结助手")
- `%APPDATA%/Sovereign Notes/` (for newer versions)

## License

MIT