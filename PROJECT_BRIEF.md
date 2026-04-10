# mosque-prayer-coordinator

> Built following my [Developer Handbook](https://github.com/zinebnadak/zinebnadak-developer-handbook) — my personal engineering process for planning, building, and documenting projects.

## 1. Project Selection Reasoning 

> This project was selected because it solves a real, observable problem for a real group of people who are actively using a workaround today.

#### Is the problem specific and observable?
Yes. A small group of 12–13 people cannot reliably confirm who will attend each of the 5 daily prayers, and frequently fail to reach the minimum of 3 people required for jama'ah (congregational prayer).

#### Do users already rely on a workaround?
Yes. They currently coordinate manually via WhatsApp — messaging and calling each other before every prayer, every day. This is slow, inconsistent, and often fails.

#### Is it possible for me to build a working MVP in 1–2 weeks?
Yes. The core functionality is a single screen showing today's prayer times with an "Attending" button per prayer and a live attendee count. This is achievable in 1–2 weeks with Next.js and Supabase.

#### Is there at least one real person who will use it?
Yes. The group is real, active, and currently experiencing this limitation daily.


## 2. Chosen Format and why

**Chosen format:** Mobile-first web app

**Why:** The group's primary usage is on phone. They need a simple UI 
accessible via a shared link (so no app store, no installation, just open 
and tap) This format gets to a working product fastest with the least complexity.


## 3. Development Process

**Approach:** Using GitHub projects (Lean Agile + Kanban)

- Kanban board for task management → [View Board](https://github.com/users/zinebnadak/projects/3)
> Note: GitHub Issues I create (eg. things I want tp fix like tasks, bugs, features) in my repo will automatically appear as cards on my Kanban board. 
- Working MVP in 7 days, then iterate based on real feedback.
- Small, meaningful commits throughout


## 4. Phase timeline & statuses

Full process defined in my [Developer Handbook](https://github.com/zinebnadak/zinebnadak-developer-handbook)
Below is this project's specific plan.

### Phase 0 — Discovery `Day 1`
Output: PROJECT_BRIEF.md
Status: DONE! 

### Phase 1 — Scope `Day 1–2`
Output: Scope section added to PROJECT_BRIEF.md
Status: DONE!

### Phase 2 — Design `Day 2–3`
Output: /docs folder with exported images
Status: DONE!

### Phase 3 — Setup `Day 3`
Output: Live (empty) URL deployment + repo visible on GitHub
Status: DONE!

### Phase 4 — Build MVP `Day 3–10`
Output: DONE!

### Phase 5 — Real User Testing `Day 7–12`
Output: Feedback list, bug list

### Phase 6 — Ship & Polish `Day 10–14`
Output: Portfolio-ready project




## 5. Scope — what is and isn't being built

**Building:**
- Display today's 5 prayer times (via Aladhan API)
- The upcoming prayer highlighted and at the top.
- "Attending" button and Live attendee COUNT on the upcoming prayer, 
- Below with names displayed in order 
- Auto display new latest upcoming prayer after each prayer passes

**NOT building (MVP):**
- User authentication / login
- Push notifications
- Leaderboard / points system
- WhatsApp integration

## 6. Tech Stack Decision

| Layer | Tool |
|---|---|
| Frontend | Next.js (mobile-first) |
| Styling | Tailwind CSS |
| Backend / Database | Supabase (PostgreSQL + Realtime) |
| Prayer Times | Aladhan API (free, no key needed) |
| Deployment | Vercel |
| Task Management | GitHub Projects (Kanban) |

## 7. After MVP Plan

Full criteria in [My Developer Handbook](https://github.com/zinebnadak/zinebnadak-developer-handbook).

- Week 3 — fix bugs, improve UX based on real usage
- Week 4 — add 1–2 high impact features from user feedback
- Week 6+ — notifications, WhatsApp integration (optional)





