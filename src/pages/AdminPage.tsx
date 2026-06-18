import { useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  adminLogin,
  approveComment,
  clearAdminToken,
  deleteComment,
  getAdminToken,
  listAllComments,
  type AdminComment,
} from "../lib/api";
import { fieldClass, labelClass } from "../lib/formStyles";

export function AdminPage() {
  const [authed, setAuthed] = useState(() => Boolean(getAdminToken()));

  return (
    <div className="min-h-screen bg-soft px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <Login onSuccess={() => setAuthed(true)} />}
      </div>
    </div>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminLogin(email.trim(), password);
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-20 max-w-sm rounded-3xl border border-app bg-surface p-8">
      <h1 className="font-display text-2xl font-bold tracking-tight">Admin</h1>
      <p className="mt-1 text-sm text-soft">Sign in to moderate questions.</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className={labelClass} htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-accent-3">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    clearAdminToken();
    onLogout();
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setComments(await listAllComments());
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return logout();
      setError(err instanceof ApiError ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveComment(id);
      setComments((list) => list.map((c) => (c.id === id ? { ...c, approved: true } : c)));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setComments((list) => list.filter((c) => c.id !== id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  };

  const pending = comments.filter((c) => !c.approved).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Questions</h1>
          <p className="mt-1 text-sm text-soft">
            {comments.length} total · {pending} pending
          </p>
        </div>
        <button onClick={logout} className="rounded-full border border-app px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
          Log out
        </button>
      </div>

      {loading && <p className="mt-10 text-soft">Loading…</p>}
      {error && <p className="mt-10 text-accent-3">{error}</p>}

      {!loading && !error && comments.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-app px-6 py-10 text-center text-soft">No questions yet.</p>
      )}

      <div className="mt-8 space-y-4">
        {comments.map((c) => (
          <article key={c.id} className="rounded-2xl border border-app bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-relaxed">{c.message}</p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-xs ${
                  c.approved ? "text-accent-2" : "text-accent-3"
                }`}
              >
                {c.approved ? "Approved" : "Pending"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-soft">
              <span className="text-accent">{c.name}</span>
              {c.email && <span>{c.email}</span>}
              {c.country && <span>{c.country}</span>}
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <div className="mt-5 flex gap-3">
              {!c.approved && (
                <button onClick={() => handleApprove(c.id)} className="btn-primary rounded-full px-4 py-2 text-sm font-medium">
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDelete(c.id)}
                className="rounded-full border border-app px-4 py-2 text-sm transition-colors hover:border-accent-3 hover:text-accent-3"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
