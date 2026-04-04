# mosque-prayer-coordinator

> Built following my [Developer Handbook](https://github.com/zinebnadak/zinebnadak-developer-handbook) — my personal engineering process for planning, building, and documenting projects.

## 1. Project Selection

> This project was selected because it solves a real, observable problem for a real group of people who are actively using a workaround today.

#### Is the problem specific and observable?
Yes. A small group of 12–13 people cannot reliably confirm who will attend each of the 5 daily prayers, and frequently fail to reach the minimum of 3 people required for jama'ah (congregational prayer).

#### Do users already rely on a workaround?
Yes. They currently coordinate manually via WhatsApp — messaging and calling each other before every prayer, every day. This is slow, inconsistent, and often fails.

#### Is it possible for me to build a working MVP in 1–2 weeks?
Yes. The core functionality is a single screen showing today's prayer times with an "Attending" button per prayer and a live attendee count. This is achievable in 1–2 weeks with Next.js and Supabase.

#### Is there at least one real person who will use it?
Yes. The group is real, active, and currently experiencing this limitation daily.


## 2. Project Format 

**Chosen format:** Mobile-first web app

**Why:** The group's primary usage is on phone. They need a simple UI 
accessible via a shared link (so no app store, no installation, just open 
and tap) This format gets to a working product fastest with the least complexity.


## 3. Development Process

**Approach:** Using GitHub projects (Lean Agile + Kanban board)

- Using GitHub projects: GitHub Issues I create (eg. things I want tp fix like tasks, bugs, features) in my repo will automatically appear as cards on my Kanban board.
- I will ship in one week, then iterate based on real feedback.
- Small, meaningful commits throughout
