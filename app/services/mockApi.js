// Lightweight mock API to be replaced with real backend integration.
// Exposes Promise-based functions that mimic network latency and return dummy data.

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let forums = [
  {
    id: '1',
    title: 'Welcome',
    description: 'Introduce yourself here',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    comments: [
      { id: 'c1', author: 'User1', text: 'Nice to meet you all!', createdAt: new Date().toISOString() }
    ],
  },
];

let announcements = [
  { id: 'a1', title: 'Tajweed Class', body: 'Weekly tajweed every Saturday at 5pm.', date: '2025-04-01' }
];

export const api = {
  async listForums() {
    await delay(200);
    return forums.slice().reverse();
  },
  async createForum({ title, description, author = 'You' }) {
    await delay(150);
    const item = { id: Date.now().toString(), title, description, author, createdAt: new Date().toISOString(), comments: [] };
    forums.push(item);
    return item;
  },
  async addComment(forumId, { author = 'User', text }) {
    await delay(100);
    const forum = forums.find(f => f.id === forumId);
    if (!forum) throw new Error('Forum not found');
    const comment = { id: Date.now().toString(), author, text, createdAt: new Date().toISOString() };
    forum.comments.push(comment);
    return comment;
  },
  async listAnnouncements() {
    await delay(150);
    return announcements.slice().reverse();
  },
  async createAnnouncement({ title, body, date }) {
    await delay(150);
    const item = { id: Date.now().toString(), title, body, date };
    announcements.push(item);
    return item;
  }
};

export default api;
