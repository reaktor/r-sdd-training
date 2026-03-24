# Personal Todo Application

### TL;DR

A single-user, web-based todo application for capturing, organizing, and completing personal tasks. No accounts, no teams -- just a fast, clean interface for managing what you need to do. Tasks support due dates, priorities, and completion tracking with filtering and search to keep focus as the list grows.

---

## Goals

### Business Goals

* Provide a zero-friction entry point that requires no signup or configuration.

* Achieve sub-second page load so the app feels instant.

* Serve as the foundation layer that the team project management tool can later build on top of.

* Demonstrate the full stack (React + Express + SQLite) with a small, shippable product.

### User Goals

* Quickly capture a task before the thought is lost.

* See at a glance what is due soon, what is high priority, and what is already done.

* Filter and search to find specific tasks without scrolling.

* Work from any device -- desktop, tablet, or phone.

### Non-Goals

* Multi-user accounts, authentication, or login.

* Workspaces, teams, or shared task lists.

* Task assignment to other people.

* Comments or discussion threads on tasks.

* Real-time collaboration or cross-session sync.

* In-app or email notifications.

* Role-based access control or permissions.

* Recurring tasks or scheduling automation.

* File attachments.

* Activity feeds or audit logs.

---

## User Stories

**User**

* As a User, I want to create a task with a title so that I can capture something I need to do.

* As a User, I want to add an optional description to a task so that I can record details or context.

* As a User, I want to set a due date on a task so that I know when it needs to be finished.

* As a User, I want to set a priority level (High, Medium, Low) so that I can distinguish urgent work from routine items.

* As a User, I want to mark a task as complete so that I can see my progress.

* As a User, I want to reopen a completed task so that I can correct a mistake.

* As a User, I want to edit a task's title, description, due date, or priority so that I can keep it accurate as things change.

* As a User, I want to delete a task so that I can remove things that are no longer relevant.

* As a User, I want to filter tasks by status (all, active, completed) so that I can focus on what still needs doing.

* As a User, I want to filter tasks by priority so that I can see only high-priority items.

* As a User, I want to sort tasks by due date, priority, or creation date so that I can organize my view.

* As a User, I want to search tasks by title or description so that I can find a specific item quickly.

---

## Functional Requirements

* **Task CRUD** (Priority: High)

  * Create a task with title (required), description (optional), due date (optional), and priority (optional, defaults to None).

  * View all tasks in a list, showing title, due date, priority, and completion status.

  * Edit any field on an existing task.

  * Delete a task permanently.

* **Completion Toggle** (Priority: High)

  * Mark a task as complete with a single click or keypress.

  * Reopen a completed task.

  * Completed tasks are visually distinct (strikethrough, muted color).

* **Due Dates** (Priority: High)

  * Optional date picker on task creation and edit.

  * Tasks past their due date are visually flagged as overdue.

  * Display dates in a human-friendly relative format ("today", "tomorrow", "3 days ago").

* **Priority Levels** (Priority: Medium)

  * Four levels: High, Medium, Low, None.

  * Visual indicator (color or badge) on each task.

  * Default to None when not specified.

* **Filtering & Sorting** (Priority: Medium)

  * Filter by status: All, Active, Completed.

  * Filter by priority: Any, High, Medium, Low.

  * Sort by: due date (soonest first), priority (highest first), creation date (newest first).

  * Filters and sort persist during the session.

* **Search** (Priority: Medium)

  * Text input that filters the visible list in real time.

  * Matches against task title and description (case-insensitive).

* **Responsive Design** (Priority: Medium)

  * Usable on screens from 320px (phone) to wide desktop.

  * Touch-friendly tap targets on mobile.

* **Keyboard Accessibility** (Priority: Low)

  * Tab navigation through the task list and form fields.

  * Enter to submit the create/edit form.

  * ARIA labels on interactive elements.

  * Visible focus indicators.

---

## User Experience

**Entry Point**

* User opens the app URL in a browser. No login, no onboarding, no setup.

* The task list loads immediately with any previously saved tasks (or an empty state with a prompt to create the first task).

**Core Flow**

* **Step 1:** User sees the task list. Active tasks are shown by default, sorted by creation date (newest first).

  * Clean layout: task form at the top, list below, filter/sort controls in a toolbar.

  * Empty state shows a friendly message and points to the "Add Task" input.

* **Step 2:** User creates a task.

  * Inline form at the top of the page: title field is always visible.

  * Expanding the form reveals description, due date, and priority fields.

  * Validation: title is required, due date must be today or later (on creation).

  * Task appears at the top of the list immediately on submit.

* **Step 3:** User completes a task.

  * Checkbox click or tap toggles completion.

  * Task gets strikethrough styling and moves to the bottom of the active list (or disappears if the "Active" filter is on).

* **Step 4:** User edits a task.

  * Click/tap on a task opens an inline edit view or detail panel.

  * All fields are editable. Save confirms, Escape cancels.

* **Step 5:** User filters or searches.

  * Toolbar with status filter (All / Active / Completed), priority filter, and sort dropdown.

  * Search field filters the list as the user types.

  * Active filters are shown as removable chips or highlighted buttons.

**Edge Cases**

* Empty list -- show motivational empty state, not a blank screen.

* Very long task list (100+ items) -- virtual scrolling or pagination to keep the UI responsive.

* Overdue tasks -- highlighted with a warning color; sorted to the top when sorting by due date.

* Browser refresh -- all data persists (SQLite backend). No data loss.

* Offline -- not supported in MVP. App requires a connection to the backend.

**UI/UX Highlights**

* Minimal chrome. The task list is the entire interface.

* High-contrast text and color-coded priority badges for scanability.

* Smooth transitions on task completion and deletion.

* Mobile-first layout that scales up gracefully to desktop.

---

## Narrative

Alex is a freelance developer juggling client projects, errands, and side work. Every morning she opens the app in her browser -- no login, no friction. She quickly types out the three things she needs to finish today, marks them High priority, and sets due dates. Yesterday's completed tasks are still visible but muted, giving her a sense of progress.

Mid-afternoon, a client emails a change request. Alex adds it as a new task, sets it to Medium priority with a Friday due date, and goes back to her current work. When she finishes a task, a single click checks it off.

At the end of the week she filters to "Completed" to see everything she accomplished -- twelve tasks done, two still open for Monday. She sorts by priority to make sure nothing critical is lingering. The whole interaction takes seconds, not minutes. The app stays out of her way and lets her focus on the work itself.

---

## Success Metrics

### User-Centric Metrics

* Tasks created per session.

* Task completion rate (completed / created).

* Filter and search usage frequency.

* Session duration and return visits.

### Technical Metrics

* Page load time: under 1 second (p95) on a 4G connection.

* API response time: under 100 ms (p95) for all endpoints.

* Zero data loss across server restarts (production mode).

* No accessibility violations at WCAG 2.1 AA level.

### Tracking Plan

* Task created, edited, completed, reopened, and deleted events.

* Filter applied / removed events.

* Sort changed events.

* Search query events (anonymized).

* Session start and duration.

---

## Technical Considerations

### Technical Needs

* RESTful API backend (Express 4) with JSON request/response.

* SQLite database (better-sqlite3) with persistent storage (no schema reset in production).

* React 19 SPA with Vite 7 for build and dev server.

* Tailwind CSS v4 for styling.

### Schema

* Single `todos` table: id, title, description, completed, due_date, priority, created_at, updated_at.

* Prepared statements for all queries.

* Indexes on `completed`, `due_date`, and `priority` for filter/sort performance.

### API Endpoints

* `GET /api/todos` -- list all todos (supports query params for filter, sort, search).

* `POST /api/todos` -- create a todo.

* `PUT /api/todos/:id` -- update a todo.

* `DELETE /api/todos/:id` -- delete a todo.

* `PATCH /api/todos/:id/toggle` -- toggle completion status.

* `GET /api/health` -- health check.

### Data Persistence

* Dev mode: schema recreated on server start (current behavior) for fast iteration.

* Production mode: schema created only if tables do not exist; data persists across restarts.

### Potential Challenges

* Keeping the UI responsive with large task lists (consider virtual scrolling).

* Date handling across time zones (store UTC, display local).

* Ensuring the inline edit UX is clean on both mobile and desktop.

---

## Milestones & Sequencing

### Project Estimate

* **Small:** ~1 week for full feature set

### Team Size

* 1 Full-stack engineer

### Suggested Phases

**Phase 0: Baseline (already implemented)**

* Task creation with title and description.

* Task list display with relative dates.

* Basic backend with `GET /api/todos` and `POST /api/todos`.

* Reference: `docs/specs/CREATE_TODOS.md`.

**Phase 1: Complete Task Lifecycle (2 days)**

* Key Deliverables:

  * Completion toggle (API + UI).

  * Edit task (API + UI).

  * Delete task (API + UI).

  * Due date and priority fields on create and edit.

  * Schema update: add `due_date`, `priority`, `updated_at` columns.

**Phase 2: Filtering, Sorting & Search (2 days)**

* Key Deliverables:

  * Filter by status and priority.

  * Sort by due date, priority, or creation date.

  * Text search across title and description.

  * Overdue task highlighting.

  * Filter/sort toolbar UI.

**Phase 3: Polish & Accessibility (1--2 days)**

* Key Deliverables:

  * Responsive layout audit (phone, tablet, desktop).

  * Keyboard navigation and ARIA labels.

  * Empty states, loading states, error states.

  * Smooth transitions and visual polish.

  * Production persistence mode (no schema reset).

---
