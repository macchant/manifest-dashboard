"use client";

import { useState } from "react";

export default function ManifestForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    payload.berat = parseFloat(payload.berat);
    payload.harga_barang = parseInt(payload.harga_barang);
    payload.ongkir = parseInt(payload.ongkir);

    const res = await fetch("/api/manifest", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);
    setMessage(res.ok ? "Berhasil disimpan!" : "Gagal menyimpan.");
  }

  return (
    <div style={{ maxWidth: 550, margin: "0 auto", padding: 20 }}>
      <h2>Form Input Manifest</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>

        <label>
          Nama Pengirim
          <input name="pengirim" required />
        </label>

        <label>
          Nama Penerima
          <input name="penerima" required />
        </label>

        <label>
          Nama Barang
          <input name="nama_barang" required />
        </label>

        <label>
          Berat (kg)
          <input name="berat" type="number" step="0.01" required />
        </label>

        <label>
          Harga Barang
          <input name="harga_barang" type="number" required />
        </label>

        <label>
          Ongkir
          <input name="ongkir" type="number" required />
        </label>

        <label>
          Metode Bayar
          <select name="metode" required>
            <option value="cod">COD</option>
            <option value="dfod">DFOD</option>
            <option value="non_cod">Non COD</option>
          </select>
        </label>

        <label>
          Jasa Pengiriman
          <select name="jasa" required>
            <option value="jnt">JNT</option>
            <option value="jne">JNE</option>
            <option value="sicepat">SiCepat</option>
            <option value="anteraja">AnterAja</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Submit"}
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
