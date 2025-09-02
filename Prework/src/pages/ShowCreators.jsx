import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCreators() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setCreators(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this creator?")) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      setCreators((prev) => prev.filter((c) => c.id !== id));
    }
  }

  async function loadSamples() {
    const samples = [
      {
        name: "Veritasium",
        url: "https://youtube.com/@veritasium",
        description: "Science and engineering explorations",
        imageurl:
          "https://i.ytimg.com/vi/WSW3nR8G-c0/maxresdefault.jpg",
      },
      {
        name: "Kurzgesagt",
        url: "https://youtube.com/@kurzgesagt",
        description: "Animated explainers about life and the universe",
        imageurl: "https://i.ytimg.com/vi/tyaEQEmt5ls/maxresdefault.jpg",
      },
      {
        name: "Fireship",
        url: "https://youtube.com/@Fireship",
        description: "High speed dev tutorials and news",
        imageurl: "https://i.ytimg.com/vi/2ZphE5HcQPQ/maxresdefault.jpg",
      },
      {
        name: "MKBHD",
        url: "https://youtube.com/@mkbhd",
        description: "Tech reviews and interviews",
        imageurl: "https://i.ytimg.com/vi/qN7U9k3qv4c/maxresdefault.jpg",
      },
      {
        name: "Ali Abdaal",
        url: "https://youtube.com/@aliabdaal",
        description: "Productivity and learning",
        imageurl: "https://i.ytimg.com/vi/5aD9G5DLeH8/maxresdefault.jpg",
      },
    ];
    const { error } = await supabase.from("creators").insert(samples);
    if (error) alert(error.message);
    else fetchCreators();
  }

  return (
    <section>
      <header className="headerbar">
        <h2>All creators</h2>
        <div className="actions">
          <Link role="button" to="/creators/new">
            Add creator
          </Link>
          <button className="secondary" onClick={loadSamples}>
            Load sample data
          </button>
        </div>
      </header>

      {loading && <progress />}
      {error && <p role="alert">{error}</p>}

      {!loading && creators.length === 0 && (
        <article>
          <p>No creators yet. Add one to begin.</p>
        </article>
      )}

      <div className="grid" style={{ marginTop: "1rem" }}>
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}
