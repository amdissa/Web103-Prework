import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";

export default function EditCreator() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageurl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();
      if (error) setError(error.message);
      else {
        setForm({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
          imageurl: data.imageurl || "",
        });
      }
      setLoading(false);
    }
    load();
  }, [id]);

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error } = await supabase.from("creators").update({ ...form }).eq("id", id);

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      nav(`/creators/${id}`);
    }
  }

  async function remove() {
    if (!confirm("Delete this creator?")) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) alert(error.message);
    else nav("/");
  }

  if (loading) return <progress />;

  return (
    <article>
      <h2>Edit creator</h2>
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
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button type="button" className="secondary" onClick={() => nav(-1)}>
            Back
          </button>
          <button type="button" className="contrast" onClick={remove}>
            Delete
          </button>
        </div>
      </form>
    </article>
  );
}
