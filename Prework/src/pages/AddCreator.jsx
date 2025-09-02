import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageurl: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.name || !form.url || !form.description) {
      setError("Please fill name, url, and description");
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from("creators")
      .insert([{ ...form }])
      .select()
      .single();

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      nav(`/creators/${data.id}`);
    }
  }

  return (
    <article>
      <h2>Add creator</h2>
      <form onSubmit={submit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={update} required />
        </label>
        <label>
          URL
          <input name="url" value={form.url} onChange={update} required />
        </label>
        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={update}
            required
          />
        </label>
        <label>
          Image URL (optional)
          <input name="imageurl" value={form.imageurl} onChange={update} />
        </label>
        {error && <p role="alert">{error}</p>}
        <div className="actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" className="secondary" onClick={() => nav(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
}
