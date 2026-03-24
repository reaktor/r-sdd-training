# Lightweight Project Management Tool

### Overview 

A collaborative, web-based task board for small teams to assign, track, and coordinate work. Built around shared workspaces where team leads delegate tasks and members report progress, replacing scattered email threads and spreadsheets with a single source of truth. Optimized for teams of 3--15 people who need clear ownership and visibility without the overhead of enterprise PM software.

---

## Goals

### Business Goals

* Achieve 1,000 active workspace users within the first quarter post-launch.
* Secure at least three organizational partnerships for pilot use within six months.
* Maintain 90% user retention rate after onboarding.
* Reduce average onboarding time to under 3 minutes.

### User Goals

* Create tasks, assign them to teammates, and track progress in a shared workspace.
* See at a glance what is assigned to whom, what is in todo, what is in progress and what is blocked.
* Communicate about tasks in context (inline comments).
* Get notified when work is assigned, completed, or past due.
* Access the board from any modern browser on desktop or mobile.

### Non-Goals

* Native mobile applications in the initial release.
* Advanced analytics, Gantt charts, or reporting dashboards.
* Integration with enterprise systems (ERP, HRMS, Jira, etc.) at launch.
* Personal/private task management -- this tool is for shared team work only.
* Time tracking or resource allocation.

---

## User Stories

### User Personas & Stories

**Team Member (includes Team Leads)**

* As a Team Member, I want to create tasks with a title, description, due date, and priority so that expectations are clear.
* As a Team Member, I want to assign tasks to one or more team members so that ownership is unambiguous.
* As a Team Member, I want to view all tasks assigned to me so that I can prioritize my daily workload.
* As a Team Member, I want to change a task's status (To Do, In Progress, Blocked, Done) so that the team knows where things stand.
* As a Team Member, I want to comment on a task so that I can ask questions or share progress without leaving the board.
* As a Team Member, I want to see tasks filtered by status or due date so that I can focus on what matters now.

**Team Lead**

* As a Team Lead, I want to see overdue and blocked tasks across the team so that I can address bottlenecks.
* As a Team Lead, I want to create recurring tasks so that regular duties are not forgotten.
* As a Team Lead, I want to drag and reorder tasks so that I can communicate priority visually.

**Admin**

* As an Admin, I want to create a workspace and invite users by email so that the team has a shared environment.
* As an Admin, I want to add or remove users from the workspace so that access stays current.
* As an Admin, I want to manage roles (Admin, Member) so that sensitive operations are restricted.

---

## Functional Requirements

* **Workspace & User Management** (Priority: High)
  * Workspace creation with a name and optional description.
  * Invite users to a workspace by email.
  * Multi-user authentication (email/password and Google SSO).
  * Role-based permissions: Admin (full control) and Member (task CRUD, comments).
  * Remove or deactivate users from a workspace.
* **Task Management** (Priority: High)
  * Create tasks with title (required), description, due date, priority (High / Medium / Low), and assignee(s).
  * Edit task details, reassign, or change deadlines.
  * Change task status: To Do, In Progress, Blocked, Done.
  * Reopen completed tasks.
  * Delete tasks (Admin and task creator only).
  * Assign tasks to one or more workspace members via autocomplete.
* **Collaboration** (Priority: High)
  * Inline comment threads on each task.
  * Real-time updates -- new tasks, status changes, and comments appear instantly for all workspace members.
* **Notifications & Activity Feed** (Priority: Medium)
  * In-app notifications for assignments, completions, comments, and overdue tasks.
  * Email notifications for assignments and overdue reminders.
  * Workspace-level activity feed showing recent changes (task created, completed, assigned, commented).
* **Filtering, Sorting & Search** (Priority: Medium)
  * Filter tasks by assignee, status, due date, or priority.
  * Sort by due date, priority, or creation time.
  * Text search across task titles and descriptions.
* **Recurring Tasks** (Priority: Low)
  * Define a recurrence schedule (daily, weekly, monthly) for a task.
  * System auto-creates the next occurrence when the current one is completed.
* **UX Enhancements** (Priority: Low)
  * Drag-and-drop task reordering within the board.
  * Responsive design for desktop, tablet, and phone browsers.
  * Keyboard shortcuts for power users.
  * Accessibility: ARIA labels, screen reader support, high-contrast theme.

---

## User Experience

**Entry Point & First-Time User Experience**

* Users discover the app via a direct link, email invite, or company portal.
* Landing page offers login/signup (Google SSO and email/password).
* First-time users see a guided tooltip tour covering the workspace, task creation, and assignment features.
* Workspace setup (name, invite members) is prompted on first login but can be deferred.

**Core Experience**

* **Step 1:** User logs in and lands on the workspace board showing all tasks organized by status (To Do, In Progress, Blocked, Done).
  * Clean layout with a prominent "Add Task" button.
  * Sidebar or top-nav shows workspace name, members, and filters.
* **Step 2:** Team Lead creates a task.
  * Modal or inline form: title, description, due date, priority, assignee(s).
  * Validation on required fields and date format.
  * Task appears instantly on every member's board.
* **Step 3:** Team Lead assigns the task.
  * Autocomplete selector drawn from workspace member roster.
  * Assigned members receive in-app and email notification.
* **Step 4:** Team Members work and communicate.
  * Comment thread under each task for questions, updates, and context.
  * Status changes (To Do -> In Progress -> Blocked -> Done) give instant visual feedback.
  * Real-time sync ensures everyone sees the current state.
* **Step 5:** Team Lead reviews progress.
  * Filter by assignee or status to focus the view.
  * Overdue and high-priority tasks are visually highlighted.
  * Activity feed shows recent workspace events at a glance.

**Edge Cases**

* Invited user never accepts -- invitation expires after 7 days, Admin can resend.
* User removed from workspace -- their assigned tasks become unassigned; historical comments remain.
* Task deleted -- soft-delete with 30-day recovery window for Admins.
* Concurrent edits -- last-write-wins with optimistic UI and conflict toast notification.

**UI/UX Highlights**

* Board view (columns by status) as the default, with a list view toggle.
* High-contrast colors and large click targets for accessibility.
* Drag-and-drop reordering within and across status columns.
* Responsive layout adapts to phone, tablet, and desktop widths.

---

## Narrative

Sarah leads a remote marketing team of eight people spread across three time zones. Before this tool, task ownership was buried in email threads -- deadlines slipped because nobody was sure who was responsible. Status updates required chasing people on chat.

With the project management tool, Sarah creates a workspace and invites her team in under two minutes. She adds tasks for the upcoming product launch, assigns each to the right person, and sets due dates. Every team member logs in and sees exactly what they own. When a designer has a question about a brief, she comments directly on the task instead of starting a new email chain. When a copywriter finishes a deliverable, she marks it done and Sarah is notified instantly.

Overdue items surface automatically, so Sarah spots a blocked task on Wednesday instead of discovering it in Friday's status meeting. The team spends less time coordinating and more time doing the actual work. Project turnaround improves and the team reports higher morale because expectations are always clear.

---

## Success Metrics

### User-Centric Metrics

* Percentage of workspace members assigning or completing at least one task per week.
* Net Promoter Score (NPS) via in-app feedback prompt.
* Average time from signup to first task assignment (target: under 5 minutes).
* Task completion rate (completed / created, per workspace).

### Business Metrics

* Number of workspaces created per month.
* Workspace churn rate (inactive for 30+ days).
* Conversion rate from free to paid tier (if monetized).
* Number of organizational pilot agreements signed.

### Technical Metrics

* Uptime: 99.9%+ monthly.
* API response time: p95 under 200 ms.
* Real-time sync latency: under 500 ms for task updates across clients.
* Critical bug rate: fewer than 2 per release cycle.

### Tracking Plan

* Signup, login, and session duration events.
* Workspace creation and member invitation events.
* Task CRUD events (created, edited, completed, reopened, deleted).
* Assignment and reassignment events.
* Comment posted events.
* Filter, sort, and search usage.
* Notification delivery and open rate (email).

---

## Technical Considerations

### Architecture Constraints

* RESTful API backend with JSON request/response for authentication, workspace management, and task CRUD.
* Persistent relational storage for users, workspaces, tasks, comments, and permissions.
* Single-page application frontend with a modern build toolchain.
* Real-time sync layer for collaborative state across workspace members.
* SSO/OAuth support for third-party authentication.
* Transactional email delivery for invitations and notifications.

### Data Model

* Workspaces contain members (with roles) and tasks. Tasks have: title, description, status (To Do / In Progress / Blocked / Done), due date, priority, assignee(s), comments, and timestamps.
* Data access is scoped by workspace membership and role. Workspace-level isolation must prevent cross-workspace data leakage.
* The API must support filtering by assignee, status, due date, and priority, sorting by due date, priority, or creation time, and text search on title/description.

### Potential Challenges

* Real-time concurrency: simultaneous edits to the same task require a conflict resolution strategy.
* Onboarding friction: first-use experience must be fast even under load.
* Abuse prevention: rate limiting on workspace invites and task creation to prevent spam.
* Data privacy: must support right to erasure for deleted users and data export on request.

