# Adel Drive Clone

A lightweight, client-side Google Drive clone built with **Next.js**, **TypeScript**, **React**, and **Tailwind CSS**. This project simulates a file storage system using `localStorage` for persistence, featuring breadcrumb navigation, folder/file creation, file uploads, and an intuitive empty state UI. It’s designed for a seamless user experience with single-click navigation and skeleton loading effects.

## Features

- **Folder and File Management**:
  - **Create folders** and files with unique names.
  - **Upload files** (metadata stored in `localStorage` with name and size).
  - **Delete** files and folders with confirmation dialog
  - **View** files and folders in a card-based layout with date and size information.

- **Breadcrumb Navigation**:
  - Navigate through folder hierarchies using breadcrumbs.
  - Single-click navigation to parent folders or the root directory.
  - Persists current folder on page refresh via `localStorage`.

- **UI Enhancements**:
  - Skeleton loading effects during initial load or data fetching.
  - Responsive design with Tailwind CSS.
  - Dialogs for creating files/folders with validation and error handling.

- **Persistence**:
  - Stores all data in `localStorage` under the `drive_clone_data` key.
  - Maintains folder structure and file metadata across sessions.

## Project Structure

```
├── app
│   └── page.tsx                # Main entry point
├── components
│   └── FileExplorer
│       ├── ActionBar.tsx       # Action buttons for creating/uploading
│       ├── Breadcrumb.tsx      # Breadcrumb navigation
│       ├── CreateFileDialog.tsx # Dialog for file creation
│       ├── CreateFolderDialog.tsx # Dialog for folder creation
│       ├── EmptyState.tsx      # Empty folder UI
│       ├── FileCard.tsx        # File card component
│       ├── FileEplorer.tsx     # Main explorer component
        ├── ConfirmDialog.tsx   # Delete confirmation
│       ├── FolderCard.tsx      # Folder card component
│       └── SkeletonCard.tsx    # Skeleton loader
├── lib
│   ├── fun.ts                 # Core logic (create, find, store items)
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # Utility functions
├── public                     # Static assets
├── styles
│   └── globals.css            # Global styles
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Technical Details

- **Frontend Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: `localStorage` for client-side persistence
- **Components**: Shadcn/UI for dialogs, buttons, and dropdowns
- **State Management**: React `useState` for folder navigation and UI updates

### Data Structure

The `DriveItem` interface defines the structure stored in `localStorage`:

```typescript
export type DriveItem = {
  id: string;
  name: string;
  createdAt: string;
  type: "folder" | "file";
  child: DriveItem[];
  size?: number; // Optional, for files
}
```

Example `localStorage` data (`drive_clone_data`):
```json
[
  {
    "id": "folder_123456789",
    "name": "hello there",
    "type": "folder",
    "createdAt": "2025-04-29T12:00:00.000Z",
    "child": [
      {
        "id": "file_123456790",
        "name": "image.png",
        "type": "file",
        "createdAt": "2025-04-29T12:01:00.000Z",
        "child": [],
        "size": 123456
      }
    ]
  }
]
```

