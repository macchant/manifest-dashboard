"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load data dari Supabase
  async function loadData() {
    setLoading(true);

    const { data: rows, error } = await supabase
      .from("manifest")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
    } else if (rows) {
      setData(rows);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);


async function loadData() {
  setLoading(true);

  const { data: rows, error } = await supabase
    .from("manifest")
    .select("*")
    .order("id", { ascending: false });

  console.log("DATA:", rows);
  console.log("ERROR:", error);

  if (error) {
    console.error("Supabase error:", error);
  } else if (rows) {
    setData(rows);
  }

  setLoading(false);
}


  // Filter pencarian
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();

    return (
      item.pengirim?.toLowerCase()?.includes(q) ||
      item.penerima?.toLowerCase()?.includes(q) ||
      item.nama_barang?.toLowerCase()?.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manifest Dashboard</h1>

        <Button onClick={loadData} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Refresh"}
        </Button>
      </header>

      {/* Pencarian */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Pencarian</CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            placeholder="Cari nama pengirim / penerima / barang"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="shadow bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {item.nama_barang}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm space-y-1">
              <p><strong>Pengirim:</strong> {item.pengirim}</p>
              <p><strong>Penerima:</strong> {item.penerima}</p>
              <p><strong>Berat:</strong> {item.berat} kg</p>
              <p><strong>Harga:</strong> Rp{item.harga}</p>
              <p><strong>Ongkir:</strong> Rp{item.ongkir}</p>
              <p><strong>Metode:</strong> {item.metode}</p>
              <p><strong>Ekspedisi:</strong> {item.ekspedisi}</p>

              <p className="text-gray-500 text-xs mt-2">
                #{item.id} • {new Date(item.created_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jika tidak ada hasil */}
      {filtered.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">
          Tidak ada data ditemukan.
        </p>
      )}
    </div>
  );
}
